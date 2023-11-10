import { screenType } from "@/schema";

export function getCurrentWindow(): screenType {
    if (window.innerWidth >= 1024) {
        return "desktop";
    } else if (window.innerWidth >= 768) {
        return "laptop";
    } else {
        return "mobile";
    }
}
