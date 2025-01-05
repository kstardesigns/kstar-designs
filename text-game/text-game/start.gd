extends Control

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	# center the elements
	$GameTitle.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	$GameTitle.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	$GameTitle.text = 'AYOOOO'
	$StartButton.text = 'Start game'
	$StartButton.connect('pressed', Callable(self, '_on_start_game_pressed'))

func _on_start_game_pressed() -> void:
	print('Start Game pressed!')
	get_tree().change_scene_to_file('res://main.tscn')
	
