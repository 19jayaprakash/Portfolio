"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const ringSpringX = useSpring(ringX, { damping: 30, stiffness: 150 });
  const ringSpringY = useSpring(ringY, { damping: 30, stiffness: 150 });

  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);
    };

    const handleEnter = () => { isHovering.current = true; };
    const handleLeave = () => { isHovering.current = false; };

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => { document.removeEventListener("mousemove", move); };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <>
      <motion.div
        className="cursor-dot hidden lg:block"
        style={{ x: springX, y: springY, position: "fixed", zIndex: 99999, pointerEvents: "none" }}
      />
      <motion.div
        className="cursor-ring hidden lg:block"
        style={{ x: ringSpringX, y: ringSpringY, position: "fixed", zIndex: 99998, pointerEvents: "none" }}
      />
    </>
  );
}
