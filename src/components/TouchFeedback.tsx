import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function TouchFeedback() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    // Only enable for touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;

    const addRipple = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newRipple = {
        id: Date.now(),
        x: touch.clientX,
        y: touch.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener("touchstart", addRipple, { passive: true });
    return () => window.removeEventListener("touchstart", addRipple);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              zIndex: 9999,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
