extends Control

# variables to track game state
var default_mood: int = 5
var mood: int = default_mood
var mood_min: int = 0
var mood_max: int = 10

var default_money: int = 0
var money: int = default_money   # player's money

var story_text: String = 'Welcome to the game! What would you like to do?'   # default story text
var choices_data: Dictionary = {}
var current_node = '1001'

# player-defined variables
var variable_map = {
	'pet_name': '',
	'job_title': 'fast food worker'
}

# current set of choice IDs to display
var current_choices: Array = []

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	load_choices()

	if FileAccess.file_exists('user://save_game.json'):
		print('save file found, loading game...')
		load_game_state()
	else:
		print('no save file found, starting a new game...')
		show_choices([current_node]) # start with first choice ID
		
	setup_debug_box()
	
func load_choices():
	var file = FileAccess.open('res://choices.json', FileAccess.READ)
	if file:
		var content = file.get_as_text()
		var parsed = JSON.parse_string(content)
		if typeof(parsed) == TYPE_DICTIONARY:
			choices_data = parsed
		else:
			print('error parsing JSON: expected a dictionary but got:', typeof(parsed))
		file.close()
	else:
		print('Error loading choices file')

func setup_debug_box():
	# connect submit button to func
	$DebugBox/GoToNode/SubmitButton.text = 'Submit'
	$DebugBox/GoToNode/SubmitButton.connect('pressed', Callable(self, '_on_debug_submit'))
	
func _on_debug_submit():
	# get the input value from debug box
	var input_id = $DebugBox/GoToNode/InputField.text.strip_edges()
	
	# check if input_id exists in choices dictionary
	if choices_data.has(input_id):
		#simulate a button press with given id
		var debug_button = Button.new()
		debug_button.set_meta('choice_id', input_id)
		_on_choice_pressed(debug_button)
	else:
		printerr('Invalid debug input: key not found in choices data ->', input_id)
	

func update_story():
	# Replace placeholders in the story text (e.g., [pet_name])
	var updated_story = story_text
	for key in variable_map.keys():
		var placeholder = '[%s]' % key
		updated_story = updated_story.replace(placeholder, variable_map[key])
	$StoryTextLabel.text = updated_story
	
	# Update stats labels
	$StatsContainer/MoodLabel.text = 'Mood: %d' % mood
	$StatsContainer/MoneyLabel.text = 'Money: $%d' % money

func show_choices(choice_ids: Array):
	current_choices = choice_ids

	# Clear existing choice buttons
	var choices_container = $ChoicesContainer
	for child in choices_container.get_children():
		choices_container.remove_child(child)
		child.queue_free()

	# Iterate over next_choices
	for choice_data in current_choices:
		print(typeof(choice_data))
		if typeof(choice_data) == TYPE_STRING:
			# Ensure choice_data is a valid key in choices_data
			if not choices_data.has(choice_data):
				print('Invalid choice ID:', choice_data)
				continue
			
			# Simple node ID
			var button = Button.new()
			button.set_meta('choice_id', choice_data)
			button.text = choices_data[choice_data].button_text
			button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))
			choices_container.add_child(button)
		elif typeof(choice_data) == TYPE_ARRAY:
			# Probabilistic choices
			var chosen_id = get_random_choice_from_array(choice_data)
			if not choices_data.has(chosen_id):
				print('Invalid probabilistic choice ID:', chosen_id)
				continue
			
			var button = Button.new()
			button.set_meta('choice_id', chosen_id)
			button.text = choices_data[chosen_id].button_text
			button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))
			choices_container.add_child(button)
		elif typeof(choice_data) == TYPE_DICTIONARY:
			# Mood-based choices
			var chosen_id = choice_data.get('id', null)
			
			if chosen_id == null:
				print('Invalid dictionary format: Missing \'id\'')
				continue
			
			# check for mood_min or mood_max
			if choice_data.has('mood_min'):
				print('contains mood_min')
				if mood >= choice_data['mood_min']:
					print('more than or equal to mood_min')
					var button = Button.new()
					button.set_meta('choice_id', chosen_id)
					button.text = choices_data[chosen_id].button_text
					button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))
					choices_container.add_child(button)
			elif choice_data.has('mood_max'):
				if mood <= choice_data['mood_max']:
					print('less than or equal to mood_max')
					var button = Button.new()
					button.set_meta('choice_id', chosen_id)
					button.text = choices_data[chosen_id].button_text
					button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))
					choices_container.add_child(button)
			else:
				print('no mood constraints found')
		else:
			print('Invalid next_choices format:', choice_data)

	# Update the story text and stats
	update_story()


func get_random_choice_from_array(probability_group: Array) -> String:
	var random_roll = randi() % 100 + 1  # Random number between 1 and 100
	var cumulative_probability = 0
	
	for choice in probability_group:
		cumulative_probability += choice.probability
		if random_roll <= cumulative_probability:
			print('DEBUG: Random roll:', random_roll, '| Chosen ID:', choice.id)
			return choice.id

	print('DEBUG: No valid choice found for random roll:', random_roll)
	return ''  # Fallback, though this should never happen if probabilities are valid

func _create_choice_button(choice_data: Dictionary):
	# Replace placeholders in the button text (e.g., [pet_name])
	var updated_button_text = choice_data.button_text
	for key in variable_map.keys():
		var placeholder = '[%s]' % key
		updated_button_text = updated_button_text.replace(placeholder, variable_map[key])
	
	# Create and add the button
	var button = Button.new()
	button.text = updated_button_text
	button.set_meta('choice_id', choice_data.id)
	button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))
	$ChoicesContainer.add_child(button)

func _on_choice_pressed(button: Button):
	# Retrieve the choice from the button's metadata
	var choice_id = button.get_meta('choice_id')
	var data = choices_data.get(str(choice_id), null)
	
	if data:
		# Update game state
		story_text = data.story
		adjust_mood(data.mood_change)
		money += data.money_change
		current_node = str(choice_id)
		
		# Load next choices or input field
		if data.next_choices:
			var next_choices = data.next_choices
			show_choices(next_choices)
		else: # Clear out container for something besides choice buttons
			current_choices = []
			var choices_container = $ChoicesContainer
			for child in choices_container.get_children():
				child.queue_free()
			update_story()
			
			# Show input field
			if data.has('input_field'):
				_show_input_field(data.input_field)
				
		save_game_state()
	else:
		print('Error: choice data not found!')
	
func _show_input_field(input_field_data: Array):
	var input_field_id = input_field_data[0]
	var placeholder_text = input_field_data[1]
	var next_node_id = input_field_data[2]
	var choices_container = $ChoicesContainer
	
	# Create input field
	var input_field = LineEdit.new()
	input_field.placeholder_text = placeholder_text
	choices_container.add_child(input_field)
	
	# Create submit button
	var submit_button = Button.new()
	submit_button.text = 'Submit'
	choices_container.add_child(submit_button)
	submit_button.connect('pressed', Callable(self, '_on_submit_input').bind(input_field, input_field_id, next_node_id))

# Handle submission of input field data
func _on_submit_input(input_field: LineEdit, input_field_id: String, next_node_id: String):
	var input_value = input_field.text.strip_edges()
	var data = choices_data.get(str(next_node_id), null)
	
	if input_value.length() == 0:
		printerr('Please enter a valid input') #TODO: Show error to user
		return
		
	# Store the input value based on the field ID
	if input_field_id in variable_map:
		variable_map[input_field_id] = input_value
		print('%s updated to: %s' % [input_field_id, input_value])
	else:
		printerr('Invalid input field ID: %s' % input_field_id)
		
	# Move to the next node
	story_text = data.story
	adjust_mood(data.mood_change)
	money += data.money_change
	current_node = str(next_node_id)
	show_choices(data.next_choices)
	
	# Auto-save after submitting input
	save_game_state()

func adjust_mood(change: int) -> void:
	mood = clamp(mood + change, mood_min, mood_max)
	
func save_game_state():
	var save_data = {
		'mood': mood,
		'money': money,
		'variable_map': variable_map,
		'current_node': current_node
	}
	
	var file = FileAccess.open('user://save_game.json', FileAccess.WRITE)
	if file:
		file.store_string(JSON.stringify(save_data))
		file.close()
		print('Game state saved successfully!')
	else:
		printerr('Failed to save game state')

func load_game_state():
	var file = FileAccess.open('user://save_game.json', FileAccess.READ)
	if file:
		var content = file.get_as_text()
		var save_data = JSON.parse_string(content)
		file.close()
		
		if typeof(save_data) == TYPE_DICTIONARY and save_data.keys().size() > 0:
			# Restore game state
			mood = save_data.get('mood', default_mood) # Default mood if not found
			money = save_data.get('money', default_money) # Default money if not found
			variable_map = save_data.get('variable_map', variable_map) # Default to empty variable_map if not found
			current_node = save_data.get('current_node', '1001') # Default to 1001 if not found
			
			# Load corresponding node data
			var data = choices_data.get(current_node, null)
			if data:
				# Update story text directly
				story_text = data.story
				
				# Set current choices if next_choices exist, otherwise clear choices
				if data.next_choices:
					current_choices = data.next_choices
				else:
					current_choices = []
					
				# Show input field if applicable
				if data.has('input_field') and not data.next_choices:
					_show_input_field(data.input_field)
				else:
					# Refresh the UI with updated story and choices
					show_choices(current_choices)
			else:
				printerr('Error loading save file: Current node not found in choices data.')
		else:
			print('Save file is empty or invalid. Starting a new game.')
			show_choices([1001]) # Default to starting node
	else:
		printerr('Save file not found.')

# Key shortcuts for testing
func _input(event):
	if Input.is_action_just_pressed('toggle_debug_box'): # Toggle debug box visibility with F1
		$DebugBox.visible = not $DebugBox.visible
	elif Input.is_action_just_pressed('reset_save_file'): # Reset the save file to default
		var file = FileAccess.open('user://save_game.json', FileAccess.WRITE)
		if file:
			file.store_string('{}')
			file.close()
			print('Save file reset!')
