# GameCrush Starter Plan

## Recommended framework
**Godot 4 (GDScript)**
- Free, open-source, and lightweight to set up.
- Great 2D workflow for roguelikes and card games.
- Simple scripting language (GDScript) and large community resources.

## Suggested game to start: **Balatro-like (card roguelike)**
A Balatro-style game is easier to begin with than a Dead Cells-style action roguelite because:
- Turn-based: no complex physics or character animation requirements.
- UI-heavy: easier to iterate while learning the engine.
- Smaller scope for a first playable prototype.

## Project phases
1. **Prototype (1–2 weeks)**
   - Core loop: draw → choose actions → resolve → reward.
   - Minimal UI to play a single run.
2. **Core systems (2–4 weeks)**
   - Deck rules, scoring rules, simple modifiers.
   - Run progression and shop rewards.
3. **Content pass (ongoing)**
   - New cards, effects, and small enemy/boss variations.
4. **Polish**
   - UI feedback, SFX, animations, and balancing.

## Decisions locked in (from you)
- **Game direction:** Balatro-like.
- **Target platform:** PC first, with potential expansion later.
- **Engine/language:** Godot 4 + GDScript (best fit for 2D, fast iteration, free).

## Project scaffold included
This repo now contains a minimal Godot 4 project that boots into a simple scene.
- `project.godot` with the main scene at `res://scenes/Main.tscn`
- `scenes/Main.tscn` + `scripts/Main.gd` for a placeholder UI label

## Immediate next steps
1. Define the **core gameplay loop** (draw → choose → resolve → reward).
2. Sketch the **first playable**: 10–15 cards, 1–2 scoring rules, and a single run.
3. Decide whether you want **placeholder art** or a quick temp UI kit.

## How to run
1. Install **Godot 4** (standard edition).
2. Open the project by selecting this folder.
3. Press **Play** to launch the placeholder scene.
