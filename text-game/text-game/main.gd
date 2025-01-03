extends Control

# variables to track game state
var mood: int = 5     # player's mood (0 to 10)
var money: int = 10   # player's money
var story_text: String = 'Welcome to the game! What would you like to do?'   # default story text
var choices_data: Dictionary = {}
var pet_name: String = ''

# current set of choice IDs to display
var current_choices: Array = []

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	load_choices()
	show_choices([1001]) # start with first choice ID
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
	

func show_choices(choice_ids: Array):
	current_choices = choice_ids
	update_story()

func update_story():
	$StoryTextLabel.text = story_text
	$StatsContainer/MoodLabel.text = 'Mood: %d' % mood
	$StatsContainer/MoneyLabel.text = 'Money: $%d' % money
	
	# clear existing choice buttons
	var choices_container = $ChoicesContainer
	for child in choices_container.get_children():
		choices_container.remove_child(child)
		child.queue_free()
		
	# add buttons for each choice
	for choice_id in current_choices:
		var choice_data = choices_data.get(str(choice_id), null)
		if choice_data:
			var button = Button.new()
			button.text = choice_data.button_text
			button.set_meta('choice_id', choice_id)
			button.connect('pressed', Callable(self, '_on_choice_pressed').bind(button))
			choices_container.add_child(button)
		
func _on_choice_pressed(button: Button):
	# Retrieve the choice from the button's metadata
	var choice_id = button.get_meta('choice_id')
	var data = choices_data.get(str(choice_id), null)
	
	if data:
		# update game state	
		story_text = data.story
		mood += data.mood_change
		money += data.money_change
		
		# load next choices or input field
		if data.next_choices:
			var next_choices = data.next_choices
			show_choices(next_choices)
		else: # clear out container for something besides choice buttons
			current_choices = []
			var choices_container = $ChoicesContainer
			for child in choices_container.get_children():
				choices_container.remove_child(child)
				child.queue_free()
			
			# show input field
			if data.has('input_field'):
				_show_input_field(data.input_field)

	else:
		print('Error: choice data not found!')
	
func _show_input_field(input_field_data: Array):
	var input_field_id = input_field_data[0]
	var placeholder_text = input_field_data[1]
	var next_node_id = input_field_data[2]
	var choices_container = $ChoicesContainer
	
	# create input field
	var input_field = LineEdit.new()
	input_field.placeholder_text = placeholder_text
	choices_container.add_child(input_field)
	
	# create submit button
	var submit_button = Button.new()
	submit_button.text = 'Submit'
	choices_container.add_child(submit_button)
	submit_button.connect('pressed', Callable(self, '_on_submit_input').bind(input_field, input_field_id, next_node_id))

	
# handle submission of input field data
func _on_submit_input(input_field: LineEdit, input_field_id: String, next_node_id: String):
	var input_value = input_field.text.strip_edges()
	
	if input_value.size() == 0: #LEFT OFF - it's not catching if it's empty
		printerr('Please enter a valid input')
		return
		
	# store the input value based on the field id
	if input_field_id == 'pet_name':
		pet_name = input_value
		print('Pet name submitted: ', pet_name)
		
	# move to the next node
	show_choices([next_node_id])
	
# toggle debug box visibility with f1
func _input(event):
	if Input.is_action_just_pressed('toggle_debug_box'):
		$DebugBox.visible = not $DebugBox.visible
