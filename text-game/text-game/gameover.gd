extends Control

var final_diary_entry: String = ''  # Default value

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	# center the elements
	$GameOverLabel.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	$GameOverLabel.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	$GameOverLabel.text = 'Game over.'
	$DiaryEntry.text = final_diary_entry 
