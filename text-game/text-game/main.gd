# ============================
# TOC:
# variables to track game state
# variables and themes for scene nodes
# player-defined variables
# game set up / debug
# choice functionality
# systems (mood, inventory)
# node functions
# load & save
# key shortcuts for testing

# ============================

extends Control

signal money_changed(old_value, new_value)

# ============================
# variables to track game state

var default_mood: int = 5
var mood: int = default_mood
var mood_min: int = 0
var mood_max: int = 10

var default_money: int = 0
var money: int = default_money   # player's money
var is_animating_money: bool = false
var current_money: float = 0 # tracks the animated money value
var target_money: float = 0
var money_animation_speed: float = 15.0 # change per second


var inventory: Array = []
var inventory_images: Dictionary = {}

var story_text: String = 'Welcome to the game! What would you like to do?'   # default story text
var choices_data: Dictionary = {}
var current_node = '1001'

# current set of choice IDs to display
var current_choices: Array = []

var final_diary_list: Array = []
var final_diary_entry: String = '';

# ============================


# ============================
# variables and themes for scene nodes
@onready var node_debug_box = $DebugBox
@onready var node_debug_current = $DebugBox/CurrentNodeLabel
@onready var node_debug_gotoinput = $DebugBox/GoToNode/InputField
@onready var node_debug_gotosubmit = $DebugBox/GoToNode/SubmitButton
@onready var node_debug_moodtext = $DebugBox/MoodSection/MoodLabel
@onready var node_storytext = $MainVBox/MarginContainer/StoryTextLabel
@onready var node_choicescontainer = $MainVBox/ChoicesMargin/ChoicesHBox/ChoicesBg/ChoicesInnerMargin/ChoicesContainer
@onready var node_moneytext = $Inventory/InventoryBg/InnerInventory/MoneyLabel
@onready var node_moneydescreasesound = $Inventory/InventoryBg/InnerInventory/MoneyLabel/MoneyDescreaseSound
@onready var node_inventory = $Inventory/InventoryBg/InnerInventory/InventoryItems
@onready var node_inventorylabel = $InventoryHoverLabel
@onready var node_choice1box = $MainVBox/ChoicesMargin/ChoicesHBox/ChoicesBg/ChoicesInnerMargin/ChoicesContainer/Choice1Margin
@onready var node_choice2box = $MainVBox/ChoicesMargin/ChoicesHBox/ChoicesBg/ChoicesInnerMargin/ChoicesContainer/Choice2Margin
@onready var node_choice3box = $MainVBox/ChoicesMargin/ChoicesHBox/ChoicesBg/ChoicesInnerMargin/ChoicesContainer/Choice3Margin
@onready var node_choice4box = $MainVBox/ChoicesMargin/ChoicesHBox/ChoicesBg/ChoicesInnerMargin/ChoicesContainer/Choice4Margin
@onready var node_choice5box = $MainVBox/ChoicesMargin/ChoicesHBox/ChoicesBg/ChoicesInnerMargin/ChoicesContainer/Choice5Margin
@onready var node_choice6box = $MainVBox/ChoicesMargin/ChoicesHBox/ChoicesBg/ChoicesInnerMargin/ChoicesContainer/Choice6Margin

var choices_theme = preload('res://themes/buttons.tres')


# ============================


# ============================
# player-defined variables

var variable_map = {
	'pet_name': '',
	'job_title': 'fast food worker',
	'player_name': ''
}

var event_map = {
	
}
# ============================


# ============================
# game set up / debug

func _process(delta): #run every frame
	if is_animating_money:
		update_money_animation(delta)

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	load_choices()
	validate_run_functions()
	self.connect('money_changed', Callable(self, '_on_money_changed'))
	
	if FileAccess.file_exists('user://save_game.json'):
		print('save file found, loading game...')
		load_game_state()
	else:
		print('no save file found, starting a new game...')
		start_game()
		
	setup_debug_box()
	
func start_game():
	var data = choices_data.get(current_node, null)
	print(data.next_choices)
	if data:
		story_text = data.story
		show_choices(data.next_choices)
	else:
		print('Error: Could not load starting node!')

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

func validate_run_functions():
	for key in choices_data.keys():
		var data = choices_data[key]
		if data.has('run_function') and not has_method(data.run_function):
			printerr('Invalid run_function \'%s\' in node %s!' % [data.run_function, key])

func set_properties_for_buttons(parent_node: Node) -> void:	
	for child in parent_node.get_children():
		if child is Button:
			child.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
			child.theme = choices_theme  # Apply the theme to all buttons
		elif child.get_child_count() > 0:
			set_properties_for_buttons(child)  # Recursively check children		
	
func connect_signals(element_node: Control, element_name: String):
	# ensure the layout is updated
	await get_tree().process_frame
	
	# get the global position of the element
	var element_pos = element_node.get_global_position()
	
	# connect the mouse_entered/exit signal for inventory items
	element_node.connect('mouse_entered', Callable(self, '_on_item_hovered').bind(element_name, element_pos))
	element_node.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	element_node.connect('mouse_exited', Callable(self, '_on_item_unhovered'))
				
func _on_item_hovered(element_name: String, element_pos: Vector2):
	# set label and position
	node_inventorylabel.text = element_name
	node_inventorylabel.position.x = element_pos.x
	
func _on_item_unhovered():
	# hide label
	node_inventorylabel.text = ''
	
func setup_debug_box():
	# connect submit button to func
	node_debug_current.text = current_node
	node_debug_gotosubmit.text = 'Submit'
	node_debug_gotoinput.placeholder_text = 'Node'
	node_debug_gotosubmit.connect('pressed', Callable(self, '_on_debug_submit'))
	
func _on_debug_submit():
	# get the input value from debug box
	var input_id = node_debug_gotoinput.text.strip_edges()
	
	# check if input_id exists in choices dictionary
	if choices_data.has(input_id):
		#simulate a button press with given id
		var debug_button = Button.new()
		debug_button.set_meta('choice_id', input_id)
		_on_choice_pressed(debug_button)
	else:
		printerr('Invalid debug input: key not found in choices data ->', input_id)
		
# ============================


# ============================
# choice functionality

func update_story():
	# Replace placeholders in the story text (e.g., [pet_name])
	var updated_story = story_text
	for key in variable_map.keys():
		var placeholder = '[%s]' % key
		updated_story = updated_story.replace(placeholder, variable_map[key])
	node_storytext.text = updated_story
	
	# Update stats labels
	node_debug_moodtext.text = 'Mood: %d' % mood

func show_choices(choice_ids: Array):
	current_choices = choice_ids
	
	# Clear existing choice buttons, set to 2 columns for buttons
	reset_choiceboxes()
	node_choicescontainer.columns = 2

	# Iterate over next_choices
	var index = 1
		
	for choice_data in current_choices:
		var button = Button.new()
		var label = Label.new()
		var margin_box = MarginContainer.new()
		
		if typeof(choice_data) == TYPE_STRING:
			# Ensure choice_data is a valid key in choices_data
			if not choices_data.has(choice_data):
				print('Invalid choice ID:', choice_data)
				continue
			
			button.set_meta('choice_id', choice_data)
			label.text = '[%d] %s' % [index, choices_data[choice_data].button_text]
			button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))

		elif typeof(choice_data) == TYPE_ARRAY:
			# Probabilistic choices
			var chosen_id = get_random_choice_from_array(choice_data)
			if not choices_data.has(chosen_id):
				print('Invalid probabilistic choice ID:', chosen_id)
				continue
			
			button.set_meta('choice_id', chosen_id)
			label.text = '[%d] %s' % [index, choices_data[chosen_id].button_text]
			button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))

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
					button.set_meta('choice_id', chosen_id)
					label.text = '[%d] %s' % [index, choices_data[chosen_id].button_text]
					button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))

			elif choice_data.has('mood_max'):
				if mood <= choice_data['mood_max']:
					print('less than or equal to mood_max')
					button.set_meta('choice_id', chosen_id)
					label.text = '[%d] %s' % [index, choices_data[chosen_id].button_text]
					button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))
					
			else:
				print('no mood constraints found')
				
			# check if a key begins with event_
			for key in choice_data.keys():
				if key.begins_with('event_'):
					var event = key.substr('event_'.length())
					print('there is an event') 
					
					# check if event_map has the key and contains the same value - create button
					if event_map.has(event):
						var event_value = event_map[event]
						if event_value == choice_data[key]:
							button.set_meta('choice_id', chosen_id)
							label.text = '[%d] %s' % [index, choices_data[chosen_id].button_text]
							button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))

		else:
			print('Invalid next_choices format:', choice_data) 
			
		# add each button to its margin parent
		match index:
			1:
				node_choice1box.add_child(button)
				node_choice1box.add_child(margin_box)
			2:
				node_choice2box.add_child(button)
				node_choice2box.add_child(margin_box)
			3:
				node_choice3box.add_child(button)
				node_choice3box.add_child(margin_box)
				node_choice3box.size_flags_horizontal = 3
				node_choice3box.size_flags_vertical = 3
			4:
				node_choice4box.add_child(button)
				node_choice4box.add_child(margin_box)
				node_choice4box.size_flags_horizontal = 3
				node_choice4box.size_flags_vertical = 3
			5:
				node_choice5box.add_child(button)
				node_choice5box.add_child(margin_box)
				node_choice5box.size_flags_horizontal = 3
				node_choice5box.size_flags_vertical = 3
			6:
				node_choice6box.add_child(button)
				node_choice6box.add_child(margin_box)
				node_choice6box.size_flags_horizontal = 3
				node_choice6box.size_flags_vertical = 3
		
		margin_box.add_child(label)

		# style margin & label, adjust so button behind them is clickable
		margin_box.add_theme_constant_override('margin_top', 15)
		margin_box.add_theme_constant_override('margin_right', 15)
		margin_box.add_theme_constant_override('margin_bottom', 15)
		margin_box.add_theme_constant_override('margin_left', 15)
		margin_box.mouse_filter = MouseFilter.MOUSE_FILTER_IGNORE
		label.autowrap_mode = 3
		label.horizontal_alignment = HorizontalAlignment.HORIZONTAL_ALIGNMENT_CENTER
		label.vertical_alignment = VerticalAlignment.VERTICAL_ALIGNMENT_CENTER
		
		index += 1
		
	# Update the story text and stats
	set_properties_for_buttons(node_choicescontainer)
	update_story()

func reset_choiceboxes():
	var marginBoxesToClear = [node_choice1box, node_choice2box, node_choice3box, node_choice4box, node_choice5box, node_choice6box]
	var marginBoxesToResize = [node_choice3box, node_choice4box, node_choice5box, node_choice6box]
	
	for marginBox in marginBoxesToClear:
		for child in marginBox.get_children():
			marginBox.remove_child(child)
			child.queue_free()
	
	for marginBox in marginBoxesToResize:
		marginBox.size_flags_horizontal = 1
		marginBox.size_flags_vertical = 1
			
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

func _on_choice_pressed(button: Button):
	# Retrieve the choice from the button's metadata
	var choice_id = button.get_meta('choice_id')
	var data = choices_data.get(str(choice_id), null)
	
	if data:
		# Update game state
		story_text = data.story
		current_node = str(choice_id)
		node_debug_current.text = current_node
		
		# Mood updates
		if (data.has('mood_change')):
			adjust_mood(data.mood_change)
			
		# Money updates
		if (data.has('money_change')):
			var old_money = money
			money += data.money_change
			money_changed.emit(old_money, money)
		
		# Inventory updates
		if (data.has('add_inventory')):
			for item in data.add_inventory:
				add_to_inventory(item)
				
		if (data.has('remove_inventory')):
			for item in data.remove_inventory:
				remove_from_inventory(item)
				
		# Update final_diary_entry
		if (data.has('diary_entry')):
			var diary_entry = data.diary_entry
			final_diary_list.append(diary_entry)
			update_diary_entry()
		else:
			printerr('diary entry missing for node %s' % choice_id)
		
		# Track events if necessary
		if (data.has('event_tracker')):
			var event_to_track = data.event_tracker
			event_map[event_to_track[0]] = event_to_track[1]			
			print('events so far:', event_map)
			
		# Load next choices or input field
		if data.next_choices:
			var next_choices = data.next_choices
			show_choices(next_choices)
		else: # Clear out container for something besides choice buttons
			current_choices = []
			reset_choiceboxes()
			update_story()
			
			# Show input field
			if data.has('input_field'):
				_show_input_field(data.input_field)
				
		# Check for and run the specified function
		if (data.has('run_function')):
			var function_name = data.run_function
			if has_method(function_name):
				call(function_name)
			else:
				printerr('function "%s" does not exist!' % function_name)
				
		save_game_state()
	else:
		print('Error: choice data not found!')
	
func _show_input_field(input_field_data: Array):
	var input_field_id = input_field_data[0]
	var placeholder_text = input_field_data[1]
	var next_node_id = input_field_data[2]
	
	node_choicescontainer.columns = 1
	
	# Create input field
	var input_field = LineEdit.new()
	input_field.placeholder_text = placeholder_text
	node_choice1box.add_child(input_field)
	
	# Create submit button
	var submit_button = Button.new()
	submit_button.text = 'Submit'
	node_choice2box.add_child(submit_button)
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
	
	if (data.has('mood_change')):
		adjust_mood(data.mood_change)
		
	if (data.has('money_change')):
		var old_money = money
		money += data.money_change
		money_changed.emit(old_money, money)
	
	current_node = str(next_node_id)
	show_choices(data.next_choices)
	
	# Auto-save after submitting input
	save_game_state()
	
# ============================


# ============================
# systems (mood, inventory)

func adjust_mood(change: int) -> void:
	mood = clamp(mood + change, mood_min, mood_max)
	
func _on_money_changed(old_value: int, new_value: int):
	is_animating_money = true
	current_money = old_value
	target_money = new_value
		
func update_money_animation(delta: float):
	var increment = money_animation_speed * delta
	if current_money < target_money:
		current_money = min(current_money + increment, target_money)
	elif current_money > target_money:
		current_money = max(current_money - increment, target_money)
		
		# play a sound when money decreases
		if node_moneydescreasesound and !node_moneydescreasesound.playing:
			node_moneydescreasesound.play()
					
	# update the money label
	node_moneytext.text = '$%d' % int(current_money)
	
	# stop animation when complete
	if current_money == target_money:
		is_animating_money = false
		money = int(target_money)  # final update
	
func add_to_inventory(item: String) -> void:
	if not inventory.has(item):
		inventory.append(item)
		initialize_inventory_image(item)
		update_inventory_display()
		print('added to inventory: ', item)
	else:
		print('item already in inventory: ', item)
		
func remove_from_inventory(item: String) -> void:
	if inventory.has(item):
		inventory.erase(item)
		inventory_images.erase(item)
		update_inventory_display()
		print('removed from inventory: ', item)
	else:
		print('item not found in inventory: ', item)
	
func update_inventory_display():
	
	# clear items before re-adding them
	for child in node_inventory.get_children():
		node_inventory.remove_child(child)
		
	# Iterate over the inventory array 
	for i in range(inventory.size()):
		var item = inventory[i]
		var margin_box = MarginContainer.new()
		var image_box = TextureRect.new()
		if inventory_images.has(item) and inventory_images[item] != null:
			margin_box.add_theme_constant_override('margin_top', 6)
			margin_box.add_theme_constant_override('margin_bottom', 10)
			margin_box.add_theme_constant_override('margin_left', 6)
			image_box.texture = inventory_images[item]
			image_box.custom_minimum_size = Vector2(48, 48)
			image_box.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
			image_box.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
			connect_signals(image_box, item)
			node_inventory.add_child(margin_box)
			margin_box.add_child(image_box)
		else:
			print('Warning: Missing image for inventory item:', item)
			
func initialize_inventory_image(item: String) -> void:
	var normalized_item_name = item.replace(' ', '_').to_lower()
	var image_path = 'res://images/%s.png' % normalized_item_name
	if FileAccess.file_exists(image_path):
		inventory_images[item] = load(image_path)
	else:
		inventory_images[item] = load('res://images/placeholder.png')
		printerr('Warning: No image found for inventory item:', item)

func update_diary_entry():
	# Reset the entry
	final_diary_entry = 'Suddenly, I was awake. First, '
	
	for i in final_diary_list.size():
		var entry = final_diary_list[i]
		
		# replace placeholders in variable_map
		var updated_entry = entry
		for key in variable_map.keys():
			var placeholder = '[%s]' % key
			updated_entry = updated_entry.replace(placeholder, variable_map[key])
		
		# Determine prefix based on the index
		if i == 0: # first one
			final_diary_entry += updated_entry
		elif i == final_diary_list.size() - 1: # last one
			final_diary_entry += ", and %s." % updated_entry
		elif i == 1: # second one
			final_diary_entry += ', then %s' % updated_entry
		elif i > 1 and i % 20 == 0: # every 20th one
			final_diary_entry += ', and %s.' % updated_entry
		elif i > 1 and (i - 1) % 20 == 0: # after every 20th one
			final_diary_entry += "\n\nAfter that, %s" % updated_entry
		else: # all others
			final_diary_entry += ', %s' % updated_entry
	print('final entry: %s\n' % final_diary_entry)


# ============================


# ============================
# node functions

func introduce_inventory_section() -> void:
	print('this is when the inventory section will appear')

func game_over() -> void: 
	# add game over button to last screen
	node_choicescontainer.columns = 1
	node_choice2box.hide()
	var button = Button.new()
	button.text = '[1] GAME OVER'
	button.connect('pressed', Callable(self, '_on_game_over_pressed'))
	node_choice1box.add_child(button)
	set_properties_for_buttons(node_choicescontainer)

func _on_game_over_pressed() -> void:
	var gameover_scene = load('res://gameover.tscn').instantiate()
	gameover_scene.final_diary_entry = final_diary_entry
	get_tree().current_scene.queue_free()  # free the current scene
	get_tree().root.add_child(gameover_scene)  # add the new scene to the tree

# ============================


# ============================
# load & save

func save_game_state():
	var save_data = {
		'mood': mood,
		'money': money,
		'variable_map': variable_map,
		'current_node': current_node,
		'inventory': inventory,
		'inventory_images': inventory_images,
		'final_diary_list': final_diary_list
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
			inventory = save_data.get('inventory', []) # Default to empty inventory
			final_diary_list = save_data.get('final_diary_list', []) # Default to empty diary list
			
			# Reset inventory
			inventory_images.clear()
			for item in inventory:
				initialize_inventory_image(item)
			update_inventory_display()
			
			# update money
			node_moneytext.text = '$%d' % int(money)
		
			# Load corresponding node data
			var data = choices_data.get(current_node, null)
			if data:
				# update story text
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
			start_game()
	else:
		printerr('Save file not found.')
# ============================


# ============================
# key shortcuts for testing & game functionality

func _input(event):
	if Input.is_action_just_pressed('toggle_debug_box'): # F1: Toggle debug box visibility
		node_debug_box.visible = not node_debug_box.visible
	elif Input.is_action_just_pressed('reset_save_file'): # F2: Reset the save file to default
		var file = FileAccess.open('user://save_game.json', FileAccess.WRITE)
		if file:
			file.store_string('{}')
			file.close()
			print('Save file reset!')
	elif event is InputEventKey and event.pressed: # 1-6: pick choice button
		# Check if the currently focused control is an InputField
		var focused = get_viewport().gui_get_focus_owner()
		
		# If the focused control is a LineEdit, return early to avoid button press logic
		if focused is LineEdit:
			return
			
		# Check if the pressed key is a number between 1 and 6
		var key_num = event.physical_keycode - KEY_1 + 1 # Convert physical keycode to a number (1-6)
		if key_num in range(1, 6):
			# check margin containers for a button corresponding to the key pressed
			var margin_container = node_choicescontainer.get_child(key_num - 1) as MarginContainer
			if margin_container and margin_container.get_child_count() > 0:
				for child in margin_container.get_children():
					if child is Button:
						_on_choice_pressed(child)
						break
			
# ============================
