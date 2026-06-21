import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "India & the World Quiz — A Fun 10-Question Challenge",
  description:
    "A fun 10-question quiz about national figures, animals, places and history from India and around the world. Score 70% to pass, with a fun fact for every question.",
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
