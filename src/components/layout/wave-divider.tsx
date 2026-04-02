export function WaveDivider({
  color = "var(--color-mint)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block h-8 w-full"
      >
        <path
          d="M0,30 C200,55 400,5 600,30 C800,55 1000,5 1200,30 L1200,60 L0,60 Z"
          fill={color}
          opacity="0.3"
        />
        <path
          d="M0,35 C200,58 400,12 600,35 C800,58 1000,12 1200,35 L1200,60 L0,60 Z"
          fill={color}
          opacity="0.15"
        />
      </svg>
    </div>
  );
}
