import { screenType } from "@/schema";
import { useEffect, useState } from "react";

export function useCurrentWindow() {
  const [screenType, setScreenType] = useState<screenType>(
    "mobile"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenType("desktop");
      } else if (width >= 768) {
        setScreenType("laptop");
      } else {
        setScreenType("mobile");
      }
    };

    handleResize(); // Initial check on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs once on mount

  return screenType;
}
