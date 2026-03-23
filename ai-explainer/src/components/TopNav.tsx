"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", icon: "◆", label: "Home" },
  { href: "/problem/intro", icon: "🌑", label: "Problem" },
  { href: "/current-workflow", icon: "🪐", label: "Workflow" },
  { href: "/solution", icon: "🌕", label: "Solution" },
  { href: "/flow/onboarding", icon: "🚀", label: "Flow" },
  { href: "/value", icon: "🌟", label: "Value" },
];

const flowSubRoutes = [
  { href: "/flow/onboarding", label: "Onboard" },
  { href: "/flow/risk-analysis", label: "Risk" },
  { href: "/flow/ips", label: "IPS" },
  { href: "/flow/portfolio", label: "Portfolio" },
  { href: "/flow/drift", label: "Drift" },
];

const problemSubRoutes = [
  { href: "/problem/intro", label: "Intro" },
  { href: "/problem/pain-points", label: "Pain Points" },
  { href: "/problem/impact", label: "Impact" },
  { href: "/problem", label: "Overview" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/flow/")) return pathname.startsWith("/flow/");
    if (href.startsWith("/problem")) return pathname.startsWith("/problem");
    return pathname === href;
  };

  const showFlowSub = pathname.startsWith("/flow/");
  const showProblemSub = pathname.startsWith("/problem");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav bar */}
      <nav className="bg-[#06060a]/80 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo / brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-xs text-white font-bold">
              ✦
            </span>
            <span className="text-sm font-semibold text-white/90 hidden sm:inline">
              AI Explainer
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    active
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="topNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-violet-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white/80 rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-white/80 rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white/80 rounded-full origin-center"
            />
          </button>
        </div>

        {/* Sub-navigation row (desktop) */}
        <AnimatePresence>
          {(showFlowSub || showProblemSub) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block border-t border-white/5 overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1.5">
                {(showFlowSub ? flowSubRoutes : problemSubRoutes).map((route) => {
                  const active = pathname === route.href;
                  const accentClass = showFlowSub
                    ? active
                      ? "bg-violet-600/25 text-violet-300 border border-violet-500/25"
                      : "text-white/55 hover:text-white/80 hover:bg-white/5"
                    : active
                      ? "bg-red-600/25 text-red-300 border border-red-500/25"
                      : "text-white/55 hover:text-white/80 hover:bg-white/5";
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${accentClass}`}
                    >
                      {route.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0a0a12]/95 backdrop-blur-xl border-b border-white/8"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile sub-routes */}
              {(showFlowSub || showProblemSub) && (
                <div className="pt-2 mt-2 border-t border-white/8">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider px-3 mb-1">
                    {showFlowSub ? "Flow Steps" : "Problem Sections"}
                  </div>
                  {(showFlowSub ? flowSubRoutes : problemSubRoutes).map((route) => {
                    const active = pathname === route.href;
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={`block px-3 py-2 ml-4 rounded-lg text-xs font-medium transition-all ${
                          active
                            ? showFlowSub
                              ? "text-violet-300 bg-violet-600/15"
                              : "text-red-300 bg-red-600/15"
                            : "text-white/50 hover:text-white/80 hover:bg-white/5"
                        }`}
                      >
                        {route.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
