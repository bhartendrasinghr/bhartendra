"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  category: string;
  scope: "India" | "International";
  prompt: string;
  options: string[];
  answer: number; // index into options
  insight: string;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "National symbols",
    scope: "India",
    prompt: "What is the national animal of India?",
    options: ["Lion", "Bengal Tiger", "Elephant", "Leopard"],
    answer: 1,
    insight:
      "The Royal Bengal Tiger became India's national animal in 1973, replacing the lion, the same year Project Tiger was launched to protect the dwindling population. India today is home to roughly 70% of the world's wild tigers.",
  },
  {
    id: "q2",
    category: "National symbols",
    scope: "India",
    prompt: "Which bird is the national bird of India?",
    options: ["Peacock", "Sarus Crane", "Great Indian Bustard", "Kingfisher"],
    answer: 0,
    insight:
      "The Indian Peacock (Pavo cristatus) was declared the national bird in 1963. It was chosen because it is found across the country and is woven deeply into Indian myth, art and culture.",
  },
  {
    id: "q3",
    category: "National figures",
    scope: "India",
    prompt: "Who is honoured as the 'Father of the Nation' in India?",
    options: [
      "Jawaharlal Nehru",
      "Sardar Vallabhbhai Patel",
      "Mahatma Gandhi",
      "Bhagat Singh",
    ],
    answer: 2,
    insight:
      "Mohandas Karamchand 'Mahatma' Gandhi led India's freedom struggle through non-violence (ahimsa) and satyagraha. The title 'Father of the Nation' is popularly attributed to a 1944 radio address by Subhas Chandra Bose.",
  },
  {
    id: "q4",
    category: "Indian history",
    scope: "India",
    prompt: "Who was the first Prime Minister of independent India?",
    options: [
      "Dr. Rajendra Prasad",
      "Jawaharlal Nehru",
      "Lal Bahadur Shastri",
      "Sardar Patel",
    ],
    answer: 1,
    insight:
      "Jawaharlal Nehru took office on 15 August 1947 and served until 1964 — the longest-serving PM in Indian history. His 'Tryst with Destiny' speech marked the moment of independence. (Dr. Rajendra Prasad was the first President.)",
  },
  {
    id: "q5",
    category: "Indian history",
    scope: "India",
    prompt: "The Taj Mahal in Agra was built by which Mughal emperor?",
    options: ["Akbar", "Babur", "Aurangzeb", "Shah Jahan"],
    answer: 3,
    insight:
      "Shah Jahan commissioned the Taj Mahal (c. 1632–1653) as a mausoleum for his wife Mumtaz Mahal. Built in white marble on the bank of the Yamuna, it is a UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
  },
  {
    id: "q6",
    category: "Geography",
    scope: "India",
    prompt: "Which is the longest river that flows within India?",
    options: ["Brahmaputra", "Godavari", "Ganga (Ganges)", "Narmada"],
    answer: 2,
    insight:
      "The Ganga flows about 2,525 km from the Gangotri glacier in the Himalayas to the Bay of Bengal, making it the longest river within India. The Godavari is the longest river of peninsular (southern) India.",
  },
  {
    id: "q7",
    category: "Geography",
    scope: "India",
    prompt: "The Thar Desert is located mainly in which Indian state?",
    options: ["Gujarat", "Rajasthan", "Madhya Pradesh", "Punjab"],
    answer: 1,
    insight:
      "The Thar, or Great Indian Desert, spans about 200,000 sq km, mostly in Rajasthan. It forms a natural boundary between India and Pakistan and is one of the most densely populated deserts in the world.",
  },
  {
    id: "q8",
    category: "National figures",
    scope: "India",
    prompt: "Who composed India's national anthem, 'Jana Gana Mana'?",
    options: [
      "Bankim Chandra Chatterjee",
      "Sarojini Naidu",
      "Rabindranath Tagore",
      "Subramania Bharati",
    ],
    answer: 2,
    insight:
      "Rabindranath Tagore wrote 'Jana Gana Mana', adopted as the national anthem in 1950. Tagore — the first non-European Nobel laureate in Literature (1913) — also wrote Bangladesh's anthem, making him the only person to author two national anthems.",
  },
  {
    id: "q9",
    category: "Geography",
    scope: "International",
    prompt: "Which is the largest country in the world by land area?",
    options: ["Canada", "China", "United States", "Russia"],
    answer: 3,
    insight:
      "Russia covers about 17 million sq km — roughly 11% of the world's land area — spanning 11 time zones across Europe and Asia. Canada is second and China third.",
  },
  {
    id: "q10",
    category: "Animals & nature",
    scope: "International",
    prompt: "Which is the largest living animal on Earth?",
    options: [
      "African Elephant",
      "Blue Whale",
      "Giraffe",
      "Saltwater Crocodile",
    ],
    answer: 1,
    insight:
      "The Blue Whale can grow over 30 metres long and weigh up to ~180 tonnes — the largest animal known to have ever lived, heavier even than the biggest dinosaurs. Its heart alone is about the size of a small car.",
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

  function reset() {
    setPicks({});
    setSubmitted(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <section className="relative min-h-screen py-20 sm:py-24">
      <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-ember-400">
            🌏 Fun Quiz Time
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink-50 sm:text-5xl">
            India &amp; the World Quiz
          </h1>
          <p className="mt-4 text-ink-200">
            10 questions about national figures, animals, places and history —
            from India and around the world. Pick an answer for each, then hit
            submit. Score{" "}
            <span className="text-ink-50 font-medium">{PASS_PERCENT}%</span> or
            more to pass, and you&apos;ll get a fun fact for every question. Good
            luck! 🎉
          </p>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="mt-10 flex items-center gap-3 text-sm text-ink-200">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full bg-ember-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-ink-300">
              {answered}/{QUESTIONS.length}
            </span>
          </div>
        )}

        {/* Result banner */}
        {submitted && (
          <div
            className={[
              "mt-10 rounded-2xl border p-6 text-center",
              passed
                ? "border-emerald-400/40 bg-emerald-400/5"
                : "border-ember-500/40 bg-ember-500/5",
            ].join(" ")}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-ink-300">
              {passed ? "Passed" : "Not quite — try again"}
            </p>
            <p className="mt-2 font-display text-5xl text-ink-50">
              {score}
              <span className="text-2xl text-ink-300">/{QUESTIONS.length}</span>
            </p>
            <p
              className={[
                "mt-1 font-display text-2xl",
                passed ? "text-emerald-300" : "text-ember-400",
              ].join(" ")}
            >
              {percent}%
            </p>
            <p className="mt-3 text-sm text-ink-200">
              {passed
                ? "Well done! You cleared the 70% passing mark. Read the insights below to learn even more."
                : `You needed ${PASS_PERCENT}% to pass. Review the insights below and give it another go.`}
            </p>
          </div>
        )}

        {/* Questions */}
        <ol className="mt-12 space-y-6">
          {QUESTIONS.map((q, i) => {
            const pick = picks[q.id];
            return (
              <li
                key={q.id}
                className="rounded-2xl border border-ink-200/10 bg-ink-700/30 p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-wider text-ink-300">
                  <span>
                    {q.category} ·{" "}
                    <span className="text-ember-400/80">{q.scope}</span>
                  </span>
                  <span className="font-mono">
                    Q{i + 1}/{QUESTIONS.length}
                  </span>
                </div>
                <p className="font-display text-xl text-ink-50">{q.prompt}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {q.options.map((opt, idx) => {
                    const selected = pick === idx;
                    const isCorrect = idx === q.answer;
                    let cls =
                      "border-ink-200/10 bg-ink-800/60 text-ink-100 hover:border-ink-200/30 hover:text-ink-50";
                    if (submitted) {
                      if (isCorrect) {
                        cls =
                          "border-emerald-400/60 bg-emerald-400/10 text-ink-50";
                      } else if (selected) {
                        cls = "border-red-400/60 bg-red-400/10 text-ink-50";
                      } else {
                        cls = "border-ink-200/10 bg-transparent text-ink-300";
                      }
                    } else if (selected) {
                      cls =
                        "border-ember-500/60 bg-ember-500/10 text-ink-50 shadow-glow";
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
                          "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-base font-medium transition",
                          cls,
                          submitted ? "cursor-default" : "",
                        ].join(" ")}
                      >
                        <span>
                          <span className="mr-2 font-mono text-xs text-ink-300">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          {opt}
                        </span>
                        {submitted && isCorrect && (
                          <span className="text-emerald-300">✓</span>
                        )}
                        {submitted && selected && !isCorrect && (
                          <span className="text-red-300">✕</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Insight */}
                {submitted && (
                  <div
                    className={[
                      "mt-4 rounded-xl border-l-2 p-4 text-sm",
                      pick === q.answer
                        ? "border-emerald-400/60 bg-emerald-400/5"
                        : "border-ember-500/60 bg-ember-500/5",
                    ].join(" ")}
                  >
                    <p className="mb-1 text-[11px] uppercase tracking-wider text-ink-300">
                      {pick === q.answer
                        ? "Correct 🎉"
                        : pick === undefined
                          ? "Not answered"
                          : "Incorrect"}{" "}
                      · Fun fact
                    </p>
                    <p className="text-ink-200">
                      <span className="text-ink-50 font-medium">
                        {q.options[q.answer]}
                      </span>{" "}
                      — {q.insight}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-3">
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
                  "rounded-full px-8 py-3 text-sm font-medium uppercase tracking-wider transition",
                  allAnswered
                    ? "bg-ember-500 text-ink-900 hover:bg-ember-400"
                    : "cursor-not-allowed border border-ink-200/20 text-ink-400",
                ].join(" ")}
              >
                Submit &amp; see my marks
              </button>
              {!allAnswered && (
                <p className="text-xs text-ink-300">
                  Answer all {QUESTIONS.length} questions to submit (
                  {QUESTIONS.length - answered} left).
                </p>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-ink-200/20 px-8 py-3 text-sm font-medium uppercase tracking-wider text-ink-100 transition hover:border-ember-400 hover:text-ember-400"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
