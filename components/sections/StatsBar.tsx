"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { useDataRefresh } from "@/lib/useDataRefresh";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 2000;
    const update = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, value]);

  return <span ref={ref}>{current}{suffix}</span>;
}

export default function StatsBar() {
  const defaultStats = [
    { value: 10, suffix: "+", label: "Projects Delivered" },
    { value: 2, suffix: "+", label: "Years Experience" },
    { value: 5, suffix: "+", label: "Happy Clients" },
    { value: 99, suffix: "%", label: "Client Satisfaction" },
  ];

  const [stats, setStats] = useState(defaultStats);

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.stats) {
          setStats(result.data.stats);
        }
      })
      .catch(err => {
        console.error("Error loading stats:", err);
        // Keep default stats on error
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh when admin updates data
  useDataRefresh(fetchData);

  return (
    <div
      className="py-16 px-6 md:px-12"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, suffix, label }, i) => (
          <div key={label} className="text-center">
            <div
              className="font-display font-bold mb-1"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--accent)" }}
            >
              <AnimatedNumber value={value} suffix={suffix} />
            </div>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
