import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export function useBreakpoint(breakpoint: keyof typeof breakpoints) {
  const [isMatch, setIsMatch] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoints[breakpoint]);
    const handleResize = () => setIsMatch(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [breakpoint]);

  return isMatch;
}
