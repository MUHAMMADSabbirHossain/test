// src/hooks/use-mobile.ts
import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Define the breakpoint (e.g., 768px)

export function useIsMobile() {
  // Use useState to store the initial value (for SSR)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      // Define the media query
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

      // Set the initial value based on the current screen size
      setIsMobile(mql.matches);

      // Define the listener function
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };

      // Add the listener
      mql.addEventListener("change", onChange);

      // Cleanup: remove the listener when the component unmounts
      return () => {
        mql.removeEventListener("change", onChange);
      };
    }
  }, []); // Empty dependency array means this effect runs only once after mount

  // Return the boolean indicating if the screen is mobile-sized
  return isMobile;
}
