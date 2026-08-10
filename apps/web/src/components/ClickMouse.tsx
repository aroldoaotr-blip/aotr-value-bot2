"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface ClickEffectLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ClickEffectLayout: React.FC<ClickEffectLayoutProps> = ({
  children,
  className = "",
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden min-h-screen ${className}`}
    >
      {/* Contenedor de las animaciones */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 120,
              height: 120,
              marginLeft: -60,
              marginTop: -60,
              borderRadius: "50%",
              backgroundColor: "rgba(59, 130, 246, 0.35)", // Color azul translúcido
              border: "1.5px solid rgba(59, 130, 246, 0.7)",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Contenido principal */}
      {children}
    </div>
  );
};
