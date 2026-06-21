import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class 8 Quiz — Geography & Indian History",
  description:
    "A 10-question quiz on national figures, animals, geography and Indian history, covering India and the world. Scoring with 70% to pass, plus an insight for every question.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink-900 text-ink-50">{children}</div>
  );
}
