"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  emoji: string;
  category: string;
  scope: "India" | "World";
  accent: string; // tailwind gradient classes for the card top stripe / badge
  prompt: string;
  options: string[];
  answer: number; // index into options
  insight: string;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    emoji: "🐯",
    category: "National Animal",
    scope: "India",
    accent: "from-orange-400 to-amber-500",
    prompt: "What is the national animal of India?",
    options: ["Lion", "Bengal Tiger", "Elephant", "Leopard"],
    answer: 1,
    insight:
      "The Royal Bengal Tiger became India's national animal in 1973, the same year Project Tiger was launched to save it. India is now home to about 70% of the world's wild tigers!",
  },
  {
    id: "q2",
    emoji: "🦚",
    category: "National Bird",
    scope: "India",
    accent: "from-sky-400 to-blue-500",
    prompt: "Which bird is the national bird of India?",
    options: ["Peacock", "Sarus Crane", "Parrot", "Kingfisher"],
    answer: 0,
    insight:
      "The Indian Peacock was made the national bird in 1963. It was chosen because it lives all across the country and appears in lots of Indian stories, art and dances.",
  },
  {
    id: "q3",
    emoji: "🕊️",
    category: "Great Leaders",
    scope: "India",
    accent: "from-emerald-400 to-teal-500",
    prompt: "Who is honoured as the 'Father of the Nation' in India?",
    options: [
      "Jawaharlal Nehru",
      "Sardar Vallabhbhai Patel",
      "Mahatma Gandhi",
      "Bhagat Singh",
    ],
    answer: 2,
    insight:
      "Mahatma Gandhi led India's freedom struggle using non-violence and truth (satyagraha). He is lovingly called the 'Father of the Nation'.",
  },
  {
    id: "q4",
    emoji: "🇮🇳",
    category: "History",
    scope: "India",
    accent: "from-violet-400 to-purple-500",
    prompt: "Who was the first Prime Minister of independent India?",
    options: [
      "Dr. Rajendra Prasad",
      "Jawaharlal Nehru",
      "Lal Bahadur Shastri",
      "Sardar Patel",
    ],
    answer: 1,
    insight:
      "Jawaharlal Nehru became PM on 15 August 1947 and served for 17 years — the longest ever. (Dr. Rajendra Prasad was India's first President.)",
  },
  {
    id: "q5",
    emoji: "🏛️",
    category: "Monuments",
    scope: "India",
    accent: "from-rose-400 to-pink-500",
    prompt: "The Taj Mahal in Agra was built by which Mughal emperor?",
    options: ["Akbar", "Babur", "Aurangzeb", "Shah Jahan"],
    answer: 3,
    insight:
      "Shah Jahan built the Taj Mahal in white marble for his wife, Mumtaz Mahal. It is one of the New Seven Wonders of the World!",
  },
  {
    id: "q6",
    emoji: "🌊",
    category: "Rivers",
    scope: "India",
    accent: "from-cyan-400 to-sky-500",
    prompt: "Which is the longest river that flows within India?",
    options: ["Brahmaputra", "Godavari", "Ganga (Ganges)", "Narmada"],
    answer: 2,
    insight:
      "The Ganga flows about 2,525 km from the Himalayas to the Bay of Bengal. The Godavari is the longest river of southern (peninsular) India.",
  },
  {
    id: "q7",
    emoji: "🏜️",
    category: "Geography",
    scope: "India",
    accent: "from-amber-400 to-orange-500",
    prompt: "The Thar Desert is found mainly in which Indian state?",
    options: ["Gujarat", "Rajasthan", "Madhya Pradesh", "Punjab"],
    answer: 1,
    insight:
      "The Thar (Great Indian Desert) covers most of Rajasthan. It's one of the most crowded deserts in the world, with lots of people and camels!",
  },
  {
    id: "q8",
    emoji: "🎵",
    category: "National Anthem",
    scope: "India",
    accent: "from-fuchsia-400 to-pink-500",
    prompt: "Who wrote India's national anthem, 'Jana Gana Mana'?",
    options: [
      "Bankim Chandra Chatterjee",
      "Sarojini Naidu",
      "Rabindranath Tagore",
      "Subramania Bharati",
    ],
    answer: 2,
    insight:
      "Rabindranath Tagore wrote 'Jana Gana Mana'. He also wrote Bangladesh's anthem — the only person to write two countries' national anthems!",
  },
  {
    id: "q9",
    emoji: "🌍",
    category: "World Geography",
    scope: "World",
    accent: "from-green-400 to-emerald-500",
    prompt: "Which is the largest country in the world by area?",
    options: ["Canada", "China", "United States", "Russia"],
    answer: 3,
    insight:
      "Russia is the biggest country — so huge it spans 11 time zones across Europe and Asia! Canada is second and China is third.",
  },
  {
    id: "q10",
    emoji: "🐋",
    category: "Amazing Animals",
    scope: "World",
    accent: "from-blue-400 to-indigo-500",
    prompt: "Which is the largest living animal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Saltwater Crocodile"],
    answer: 1,
    insight:
      "The Blue Whale is the largest animal that has ever lived — even bigger than the dinosaurs! Its heart alone is about the size of a small car.",
  },
];

const PASS_PERCENT = 70;

export default function QuizApp() {
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(picks).length;
  const allAnswered = answered === QUESTIONS.length;

  const score = useMemo(
    () =>
      QUESTIONS.reduce(
        (acc, q) => (picks[q.id] === q.answer ? acc + 1 : acc),
        0
      ),
    [picks]
  );
  const percent = Math.round((score / QUESTIONS.length) * 100);
  const passed = percent >= PASS_PERCENT;
  const progress = Math.round((answered / QUESTIONS.length) * 100);

  const verdict = passed
    ? percent === 100
      ? { emoji: "🏆", title: "Perfect score!", note: "Wow — you got every single one right. You're a superstar! 🌟" }
      : { emoji: "🎉", title: "You passed!", note: "Great job! You cleared the quiz. Read the fun facts below to learn even more." }
    : { emoji: "💪", title: "So close — try again!", note: `You needed ${PASS_PERCENT}% to pass. Check out the fun facts below, then give it another go!` };

  function reset() {
    setPicks({});
    setSubmitted(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-violet-100 to-pink-100 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="rounded-[2rem] bg-white/70 p-7 text-center shadow-xl ring-1 ring-white/60 backdrop-blur sm:p-9">
          <div className="text-5xl sm:text-6xl">🌏✨</div>
          <h1 className="mt-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            India &amp; the World Quiz
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            10 fun questions about animals, leaders, places and history — from
            India and around the world. Score{" "}
            <span className="font-bold text-violet-600">{PASS_PERCENT}%</span> to
            win, and get a cool fact for every question. Good luck! 🎉
          </p>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="sticky top-3 z-10 mt-6 flex items-center gap-3 rounded-full bg-white/80 px-4 py-3 shadow-lg ring-1 ring-white/60 backdrop-blur">
            <span className="text-xl">📝</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-600">
              {answered}/{QUESTIONS.length}
            </span>
          </div>
        )}

        {/* Result banner */}
        {submitted && (
          <div
            className={[
              "mt-6 rounded-[2rem] p-8 text-center text-white shadow-xl",
              passed
                ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                : "bg-gradient-to-br from-amber-400 to-orange-500",
            ].join(" ")}
          >
            <div className="text-6xl">{verdict.emoji}</div>
            <p className="mt-2 text-2xl font-extrabold">{verdict.title}</p>
            <div className="mt-4 inline-flex items-baseline gap-2 rounded-full bg-white/25 px-6 py-2">
              <span className="text-4xl font-black">
                {score}
                <span className="text-2xl opacity-80">/{QUESTIONS.length}</span>
              </span>
              <span className="text-2xl font-extrabold">· {percent}%</span>
            </div>
            <p className="mx-auto mt-4 max-w-md text-white/95">{verdict.note}</p>
          </div>
        )}

        {/* Questions */}
        <ol className="mt-6 space-y-5">
          {QUESTIONS.map((q, i) => {
            const pick = picks[q.id];
            const isRight = pick === q.answer;
            return (
              <li
                key={q.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${q.accent}`} />
                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-2xl ${q.accent}`}
                    >
                      {q.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        Q{i + 1} · {q.category} · {q.scope}
                      </p>
                      <p className="text-lg font-bold leading-snug text-slate-800">
                        {q.prompt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {q.options.map((opt, idx) => {
                      const selected = pick === idx;
                      const isCorrect = idx === q.answer;
                      let cls =
                        "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-400 hover:bg-violet-50";
                      let chip = "bg-slate-200 text-slate-500";
                      if (submitted) {
                        if (isCorrect) {
                          cls = "border-emerald-400 bg-emerald-50 text-emerald-800";
                          chip = "bg-emerald-500 text-white";
                        } else if (selected) {
                          cls = "border-rose-400 bg-rose-50 text-rose-800";
                          chip = "bg-rose-500 text-white";
                        } else {
                          cls = "border-slate-200 bg-white text-slate-400";
                        }
                      } else if (selected) {
                        cls =
                          "border-violet-500 bg-violet-100 text-violet-900 shadow-md";
                        chip = "bg-violet-500 text-white";
                      }
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={submitted}
                          aria-pressed={selected}
                          onClick={() =>
                            setPicks((p) => ({ ...p, [q.id]: idx }))
                          }
                          className={[
                            "flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-base font-semibold transition active:scale-[0.98]",
                            cls,
                            submitted ? "cursor-default" : "cursor-pointer",
                          ].join(" ")}
                        >
                          <span
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${chip}`}
                          >
                            {submitted && isCorrect
                              ? "✓"
                              : submitted && selected && !isCorrect
                                ? "✕"
                                : String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Fun fact */}
                  {submitted && (
                    <div
                      className={[
                        "mt-4 rounded-2xl p-4 text-sm",
                        isRight
                          ? "bg-emerald-50 text-emerald-900"
                          : "bg-amber-50 text-amber-900",
                      ].join(" ")}
                    >
                      <p className="mb-1 font-bold">
                        {isRight
                          ? "Correct! 🎉"
                          : pick === undefined
                            ? "Not answered"
                            : "Oops, not quite"}{" "}
                        · 💡 Fun fact
                      </p>
                      <p>
                        The answer is{" "}
                        <span className="font-bold">{q.options[q.answer]}</span>.{" "}
                        {q.insight}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 pb-4">
          {!submitted ? (
            <>
              <button
                type="button"
                disabled={!allAnswered}
                onClick={() => {
                  setSubmitted(true);
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={[
                  "w-full rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-lg transition active:scale-[0.98] sm:w-auto",
                  allAnswered
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
                    : "cursor-not-allowed bg-slate-300",
                ].join(" ")}
              >
                Show my score! 🎯
              </button>
              {!allAnswered && (
                <p className="text-sm font-medium text-slate-500">
                  Answer all {QUESTIONS.length} questions to finish (
                  {QUESTIONS.length - answered} to go).
                </p>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="w-full rounded-full bg-white px-8 py-4 text-lg font-extrabold text-violet-600 shadow-lg ring-2 ring-violet-200 transition hover:ring-violet-400 active:scale-[0.98] sm:w-auto"
            >
              Play again 🔁
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
