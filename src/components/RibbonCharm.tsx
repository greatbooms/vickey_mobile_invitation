export function RibbonCharm({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`ribbon-charm ${className}`}
      viewBox="0 0 180 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M82 46C56 19 25 20 40 41C49 53 71 54 82 46ZM86 46C108 14 140 19 130 40C123 54 99 54 86 46Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        fillOpacity=".12"
      />
      <path
        d="M81 48C64 62 52 73 24 64M89 48C104 65 109 76 147 70"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <ellipse cx="85" cy="47" rx="6" ry="8" fill="currentColor" opacity=".7" />
      <path
        d="M151 20L154 27L161 30L154 33L151 40L148 33L141 30L148 27Z"
        fill="#c29b62"
        opacity=".8"
      />
      <path
        d="M22 24C16 18 11 25 22 33C33 25 28 18 22 24Z"
        fill="currentColor"
        opacity=".6"
      />
    </svg>
  );
}
