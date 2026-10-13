export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 180 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 83C55 59 91 52 156 9M59 60C70 44 76 34 75 18M101 39C122 43 143 44 169 33"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {[
        [28, 70, -35],
        [47, 61, 30],
        [64, 53, -30],
        [82, 43, 30],
        [101, 30, -35],
        [123, 17, 20],
        [72, 34, -10],
        [146, 39, 75],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="7"
          ry="15"
          transform={`rotate(${r} ${x} ${y})`}
          fill="currentColor"
          opacity={i % 2 ? ".4" : ".65"}
        />
      ))}
      <circle cx="123" cy="44" r="5" fill="#c88c79" opacity=".7" />
      <circle cx="135" cy="16" r="3" fill="#b59a62" />
    </svg>
  );
}
