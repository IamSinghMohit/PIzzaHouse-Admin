import { useState, useEffect } from "react";
import { screenType } from "@/schema";

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState<screenType>("mobile");

    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            setScreenSize("desktop");
        } else if (window.innerWidth >= 768) {
            setScreenSize("laptop");
        } else {
            setScreenSize("mobile");
        }
    };

    useEffect(() => {
        // Initialize the screen size on component mount
        handleResize();

        // Listen for window resize events to update the screen size
        window.addEventListener("resize", handleResize);

        return () => {
            // Clean up the event listener on unmount
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenSize;
}
