"use client";

const items = [
  "Next.js", "★", "React", "★", "TypeScript", "★", "Node.js", "★",
  "Tailwind CSS", "★", "GSAP", "★", "Framer Motion", "★", "PostgreSQL", "★",
  "UI/UX Design", "★", "GraphQL", "★", "Docker", "★", "Figma", "★",
];

export default function MarqueeBar() {
  return (
    <div
      className="w-full overflow-hidden border-y py-4"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="marquee-inner">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="px-6 text-sm font-mono whitespace-nowrap"
            style={{
              color: item === "★" ? "var(--accent)" : "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
