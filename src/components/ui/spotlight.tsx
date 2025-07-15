// src/components/ui/spotlight.tsx

'use client';
import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  fill?: string;
};

export function Spotlight({
  className,
  size = 200, // A larger default size looks better for a global effect
  fill,
  springOptions = { mass: 0.5, stiffness: 100, damping: 10 }, // Smoother spring settings
}: SpotlightProps) {
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    // Attach the listener to the window object for global tracking
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]); // Empty dependency array means this runs only once on mount

  // Transform the spring values to calculate the CSS 'left' and 'top' properties
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  return (
    <motion.div
      className={cn(
        // Use 'fixed' to position relative to the viewport, making it global
        'pointer-events-none fixed z-30 rounded-full blur-xl',
        'bg-[radial-gradient(circle_at_center,var(--spotlight-color),transparent_60%)]',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        '--spotlight-color': fill || 'white',
      }}
      // Animate from transparent to semi-opaque on load for a smooth entry
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.5 }}
    />
  );
}