export function BridgeLogo({
  width = 42,
  height = 27,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="25" x2="45" y2="25" />
      <line x1="15" y1="7" x2="15" y2="25" />
      <line x1="33" y1="7" x2="33" y2="25" />
      <path d="M3 17 Q15 5 24 13 Q33 5 45 17" />
      <line x1="9" y1="20.5" x2="9" y2="25" />
      <line x1="20" y1="15" x2="20" y2="25" />
      <line x1="24" y1="13" x2="24" y2="25" />
      <line x1="28" y1="15" x2="28" y2="25" />
      <line x1="39" y1="20.5" x2="39" y2="25" />
    </svg>
  );
}

export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 8h9M8 4l4 4-4 4" />
    </svg>
  );
}
