import { useMemo, useState } from "react";

const RANKS = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "2",
  "BJ",
  "RJ",
] as const;

type Rank = (typeof RANKS)[number];

type Modifier = {
  name: string;
  description: string;
  add: number;
  mult: number;
};

const RANK_VALUES: Record<Rank, number> = {
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
  "2": 15,
  BJ: 16,
  RJ: 17,
};

const MODIFIERS: Modifier[] = [
  { name: "Lucky Stamp", description: "+30 score", add: 30, mult: 1 },
  { name: "Greedy Coin", description: "x1.5 score", add: 0, mult: 1.5 },
  { name: "Calm Breath", description: "+10 score", add: 10, mult: 1 },
  { name: "Double Down", description: "x2 score, -10 base", add: -10, mult: 2 },
];

const HAND_TYPES = [
  "Rocket (Joker pair)",
  "Bomb (Four of a kind)",
  "Straight",
  "Triple",
  "Pair",
  "Single",
] as const;

type HandType = (typeof HAND_TYPES)[number];

type HandResult = {
  hand: Rank[];
  type: HandType | "No hand";
  score: number;
};

const EMPTY_RESULT: HandResult = {
  hand: [],
  type: "No hand",
  score: 0,
};

const drawHand = (count: number): Rank[] => {
  const deck: Rank[] = [];
  for (const rank of RANKS) {
    const copies = rank === "BJ" || rank === "RJ" ? 1 : 4;
    for (let i = 0; i < copies; i += 1) {
      deck.push(rank);
    }
  }
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, count);
};

const evaluateHand = (hand: Rank[]): HandType | "No hand" => {
  if (hand.length === 0) return "No hand";
  const counts = new Map<Rank, number>();
  for (const card of hand) {
    counts.set(card, (counts.get(card) ?? 0) + 1);
  }
  const unique = counts.size;
  if (unique === 2 && counts.get("BJ") === 1 && counts.get("RJ") === 1) {
    return "Rocket (Joker pair)";
  }
  if ([...counts.values()].some((value) => value === 4)) {
    return "Bomb (Four of a kind)";
  }
  if (isStraight(hand)) {
    return "Straight";
  }
  if ([...counts.values()].some((value) => value === 3)) {
    return "Triple";
  }
  if ([...counts.values()].some((value) => value === 2)) {
    return "Pair";
  }
  return "Single";
};

const isStraight = (hand: Rank[]): boolean => {
  if (hand.length < 5) return false;
  const values = hand
    .filter((card) => card !== "2" && card !== "BJ" && card !== "RJ")
    .map((card) => RANK_VALUES[card])
    .sort((a, b) => a - b);
  if (values.length !== hand.length) return false;
  for (let i = 0; i < values.length - 1; i += 1) {
    if (values[i + 1] !== values[i] + 1) return false;
  }
  return true;
};

const scoreHand = (hand: Rank[], type: HandType | "No hand", modifier: Modifier) => {
  if (type === "No hand") return 0;
  let base = 0;
  switch (type) {
    case "Rocket (Joker pair)":
      base = 200;
      break;
    case "Bomb (Four of a kind)":
      base = 100;
      break;
    case "Straight":
      base = 60;
      break;
    case "Triple":
      base = 40;
      break;
    case "Pair":
      base = 20;
      break;
    case "Single":
      base = 10;
      break;
  }
  const sum = hand.reduce((acc, card) => acc + RANK_VALUES[card], 0);
  const modified = Math.floor((base + sum + modifier.add) * modifier.mult);
  return Math.max(modified, 0);
};

const formatHand = (hand: Rank[]) =>
  hand
    .slice()
    .sort((a, b) => RANK_VALUES[a] - RANK_VALUES[b])
    .join(", ");

const pickModifier = () => MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];

export default function App() {
  const [modifier, setModifier] = useState<Modifier>(() => pickModifier());
  const [result, setResult] = useState<HandResult>(EMPTY_RESULT);
  const [message, setMessage] = useState("Ready.");

  const modifierLabel = useMemo(
    () => `${modifier.name} (${modifier.description})`,
    [modifier]
  );

  const handleDraw = () => {
    const hand = drawHand(5);
    const type = evaluateHand(hand);
    const score = scoreHand(hand, type, modifier);
    setResult({ hand, type, score });
    setMessage("Hand drawn. Modifier applied.");
  };

  const handleNewRun = () => {
    const next = pickModifier();
    setModifier(next);
    setResult(EMPTY_RESULT);
    setMessage("New run modifier applied.");
  };

  return (
    <div className="page">
      <main className="card">
        <header>
          <p className="eyebrow">GameCrush Web Demo</p>
          <h1>Doudizhu-inspired hand evaluator</h1>
          <p className="subtitle">
            Draw a 5-card hand, evaluate it, then apply a roguelike modifier.
          </p>
        </header>

        <section className="modifier">
          <span className="label">Modifier</span>
          <strong>{modifierLabel}</strong>
        </section>

        <section className="actions">
          <button type="button" onClick={handleDraw}>
            Draw Hand
          </button>
          <button type="button" className="ghost" onClick={handleNewRun}>
            New Run Modifier
          </button>
        </section>

        <section className="results">
          <div>
            <span className="label">Hand</span>
            <p>{result.hand.length ? formatHand(result.hand) : "(empty)"}</p>
          </div>
          <div>
            <span className="label">Type</span>
            <p>{result.type}</p>
          </div>
          <div>
            <span className="label">Score</span>
            <p>{result.score}</p>
          </div>
        </section>

        <footer>
          <span className="status">{message}</span>
        </footer>
      </main>
    </div>
  );
}
