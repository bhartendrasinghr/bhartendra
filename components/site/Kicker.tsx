export default function Kicker({
  children,
  color,
  lineColor,
}: {
  children: React.ReactNode;
  color?: string;
  lineColor?: string;
}) {
  return (
    <div className="kicker">
      <span className="line" style={lineColor ? { background: lineColor } : undefined} />
      <span className="label" style={color ? { color } : undefined}>
        {children}
      </span>
    </div>
  );
}
