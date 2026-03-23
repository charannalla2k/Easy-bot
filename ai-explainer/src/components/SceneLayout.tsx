"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SceneLayoutProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
}

export default function SceneLayout({
  children,
  gradient = "from-[#06060a] via-[#0a0a1a] to-[#06060a]",
  className = "",
}: SceneLayoutProps) {
  const pathname = usePathname();

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-screen flex flex-col items-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] animate-pulse-soft" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[100px] animate-pulse-soft" style={{ animationDelay: "2s" }} />
      </div>

      {/* Noise overlay */}
      <div className="noise pointer-events-none absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-12 flex flex-col items-center min-h-screen">
        {children}
      </div>
    </motion.div>
  );
}
