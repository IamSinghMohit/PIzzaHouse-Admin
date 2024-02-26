import { io } from "socket.io-client";
export function initSocket() {
    return io(import.meta.env.VITE_BACKEND_URL, {
        timeout: 100000,
        forceNew: true,
    });
}
