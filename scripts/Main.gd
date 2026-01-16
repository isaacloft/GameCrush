extends Control

const RANKS: Array = [
	"3", "4", "5", "6", "7", "8", "9", "10",
	"J", "Q", "K", "A", "2", "BJ", "RJ"
]
const RANK_VALUES := {
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"10": 10,
	"J": 11,
	"Q": 12,
	"K": 13,
	"A": 14,
	"2": 15,
	"BJ": 16,
	"RJ": 17,
}

const MODIFIERS: Array = [
	{
		"name": "Lucky Stamp",
		"description": "+30 score",
		"add": 30,
		"mult": 1.0,
	},
	{
		"name": "Greedy Coin",
		"description": "x1.5 score",
		"add": 0,
		"mult": 1.5,
	},
	{
		"name": "Calm Breath",
		"description": "+10 score",
		"add": 10,
		"mult": 1.0,
	},
	{
		"name": "Double Down",
		"description": "x2 score, -10 base",
		"add": -10,
		"mult": 2.0,
	},
]

@onready var hand_label: Label = $Content/HandLabel
@onready var type_label: Label = $Content/TypeLabel
@onready var score_label: Label = $Content/ScoreLabel
@onready var modifier_label: Label = $Content/ModifierLabel
@onready var log_label: Label = $Content/LogLabel

var current_modifier: Dictionary = {}

func _ready() -> void:
	_roll_modifier()
	_update_ui([], "No hand yet", 0)

func _on_draw_button_pressed() -> void:
	var hand := _draw_hand(5)
	var type := _evaluate_hand(hand)
	var score := _score_hand(hand, type)
	log_label.text = "Hand drawn. Modifier applied."
	_update_ui(hand, type, score)

func _on_next_run_button_pressed() -> void:
	_roll_modifier()
	log_label.text = "New run modifier applied."
	_update_ui([], "No hand yet", 0)

func _roll_modifier() -> void:
	current_modifier = MODIFIERS.pick_random()
	modifier_label.text = "%s (%s)" % [
		current_modifier["name"],
		current_modifier["description"],
	]

func _draw_hand(count: int) -> Array:
	var deck: Array = []
	for rank in RANKS:
		var copies := 4
		if rank == "BJ" or rank == "RJ":
			copies = 1
		for i in range(copies):
			deck.append(rank)
	deck.shuffle()
	return deck.slice(0, count)

func _evaluate_hand(hand: Array) -> String:
	if hand.size() == 0:
		return "No hand"
	var counts := {}
	for card in hand:
		counts[card] = counts.get(card, 0) + 1
	var unique_cards := counts.keys()
	if unique_cards.size() == 2 and counts.has("BJ") and counts.has("RJ"):
		return "Rocket (Joker pair)"
	if _has_of_a_kind(counts, 4):
		return "Bomb (Four of a kind)"
	if _is_straight(hand):
		return "Straight"
	if _has_of_a_kind(counts, 3):
		return "Triple"
	if _has_of_a_kind(counts, 2):
		return "Pair"
	return "Single"

func _has_of_a_kind(counts: Dictionary, size: int) -> bool:
	for value in counts.values():
		if value == size:
			return true
	return false

func _is_straight(hand: Array) -> bool:
	if hand.size() < 5:
		return false
	var values: Array = []
	for card in hand:
		if card == "2" or card == "BJ" or card == "RJ":
			return false
		values.append(RANK_VALUES[card])
	values.sort()
	for i in range(values.size() - 1):
		if values[i + 1] != values[i] + 1:
			return false
	return true

func _score_hand(hand: Array, hand_type: String) -> int:
	var base := 0
	match hand_type:
		"Rocket (Joker pair)":
			base = 200
		"Bomb (Four of a kind)":
			base = 100
		"Straight":
			base = 60
		"Triple":
			base = 40
		"Pair":
			base = 20
		"Single":
			base = 10
		_:
			base = 0
	var sum := 0
	for card in hand:
		sum += RANK_VALUES[card]
	var modified := int((base + sum + current_modifier["add"]) * current_modifier["mult"])
	return max(modified, 0)

func _update_ui(hand: Array, hand_type: String, score: int) -> void:
	if hand.size() == 0:
		hand_label.text = "Hand: (empty)"
		type_label.text = "Type: %s" % hand_type
		score_label.text = "Score: 0"
		return
	var display := hand.duplicate()
	display.sort_custom(func(a, b): return RANK_VALUES[a] < RANK_VALUES[b])
	hand_label.text = "Hand: %s" % ", ".join(display)
	type_label.text = "Type: %s" % hand_type
	score_label.text = "Score: %d" % score
