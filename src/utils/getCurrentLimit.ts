import { getCurrentWindow } from "./getCurrentWindow";

export function getCurrentLimit() {
    const screen = getCurrentWindow();
    let limit = 0;
    if (screen == "desktop") {
        limit = 6;
    } else if (screen == "laptop") {
        limit = 5;
    } else {
        limit = 3;
    }
    return limit
}
