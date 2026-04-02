"use client";

export function CloudDecoration() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden hidden sm:block">
      {/* Top-right cloud */}
      <svg
        className="absolute -right-10 -top-10 h-40 w-60 text-primary/5"
        viewBox="0 0 240 160"
        fill="currentColor"
      >
        <ellipse cx="120" cy="100" rx="100" ry="50" />
        <ellipse cx="80" cy="80" rx="60" ry="40" />
        <ellipse cx="160" cy="75" rx="55" ry="45" />
        <ellipse cx="120" cy="65" rx="70" ry="40" />
      </svg>

      {/* Bottom-left cloud */}
      <svg
        className="absolute -bottom-8 -left-10 h-32 w-52 text-sky/8"
        viewBox="0 0 240 160"
        fill="currentColor"
      >
        <ellipse cx="120" cy="100" rx="100" ry="50" />
        <ellipse cx="70" cy="80" rx="55" ry="35" />
        <ellipse cx="170" cy="78" rx="50" ry="40" />
        <ellipse cx="120" cy="70" rx="65" ry="35" />
      </svg>

      {/* Scattered stars */}
      <svg
        className="absolute right-1/4 top-1/3 h-4 w-4 text-lemon"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
      </svg>
      <svg
        className="absolute left-1/3 top-1/4 h-3 w-3 text-mint"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
      </svg>
      <svg
        className="absolute bottom-1/4 right-1/3 h-3.5 w-3.5 text-peach"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
      </svg>
    </div>
  );
}
