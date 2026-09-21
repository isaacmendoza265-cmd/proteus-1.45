import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export function ThreeDCard({ children, className = "", depth = 40 }: ThreeDCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map coordinate bounds to max rotation angle in degrees
  const rotateX = useTransform(y, [-150, 150], [12, -12]);
  const rotateY = useTransform(x, [-150, 150], [-12, 12]);

  // Dynamic shine/glare percent positions
  const glareX = useTransform(x, [-150, 150], [0, 100]);
  const glareY = useTransform(y, [-150, 150], [0, 100]);

  // Shadow shift to simulate directional lighting
  const shadowX = useTransform(x, [-150, 150], [8, -8]);
  const shadowY = useTransform(y, [-150, 150], [15, -5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Bounds check to avoid drastic jumps
    const mouseX = Math.max(-150, Math.min(150, event.clientX - rect.left - width / 2));
    const mouseY = Math.max(-150, Math.min(150, event.clientY - rect.top - height / 2));
    
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="relative group [perspective:1200px] h-full w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]) => `${sx}px ${sy}px 35px -5px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)`
          )
        }}
        className={`relative rounded-2xl cursor-pointer select-none overflow-hidden transition-shadow duration-300 backdrop-blur-xl border border-white/15 ${className}`}
      >
        {/* Dynamic Glare Reflection Overlay */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%)`
            ),
            pointerEvents: "none",
          }}
          className="absolute inset-0 z-30"
        />

        {/* Outer 3D Ambient Ring (Highlight rim) */}
        <div className="absolute inset-0 rounded-2xl border border-white/20 z-20 pointer-events-none group-hover:border-sky-400/50 transition-colors duration-300" />

        {/* Content Translation with Perspective Z depth */}
        <div 
          style={{ 
            transform: `translateZ(${depth}px)`, 
            transformStyle: "preserve-3d" 
          }} 
          className="h-full w-full relative z-10"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
