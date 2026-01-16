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

## Demo behavior (Doudizhu-inspired)
- Draws a **5-card hand** from a Doudizhu-style deck (ranks 3–A, 2, Black Joker, Red Joker).
- Detects basic hand types: **single, pair, triple, straight, bomb, rocket**.
- Applies a **roguelike modifier** each run (simple score add/mult).
- Outputs the hand, type, and score in the UI.

## Immediate next steps
1. Define the **core gameplay loop** (draw → choose → resolve → reward).
2. Sketch the **first playable**: 10–15 cards, 1–2 scoring rules, and a single run.
3. Decide whether you want **placeholder art** or a quick temp UI kit.

## How to run
1. Install **Godot 4** (standard edition).
2. Open the project by selecting this folder.
3. Press **Play** to launch the demo scene.
4. Click **Draw Hand** and **New Run Modifier** to see scoring changes.

## Run on macOS
1. Download **Godot 4 (Standard)** from https://godotengine.org/download.
2. Unzip and move `Godot.app` to **/Applications** (optional but recommended).
3. Launch Godot and click **Import**.
4. Select this repo folder (`GameCrush`) and open the project.
5. Press **Play** to run the demo.

## Web demo (TypeScript)
This repo also includes a TypeScript web demo powered by **Vite + React** under `/web`.

### Run locally
1. `cd web`
2. `npm install`
3. `npm run dev`
4. Open the URL shown in your terminal (usually http://localhost:5173).

### Troubleshooting npm install
If `npm install` fails with a 403 or registry error, it usually means your environment
is blocking access to the public npm registry. Try the following on your machine:
1. Ensure npm is pointing to the public registry:
   - `npm config set registry https://registry.npmjs.org/`
2. Re-run `npm install`.
3. If you're behind a proxy or corporate network, configure npm proxy settings or use a
   registry mirror you have access to.
