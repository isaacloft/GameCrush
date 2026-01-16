extends Node2D

@onready var title: Label = $Title

func _ready() -> void:
	title.text = "GameCrush: Balatro-like prototype"
