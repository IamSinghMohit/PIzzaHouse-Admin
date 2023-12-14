import { createContext, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client/debug";
import { initSocket } from "./lib/socket";

const socketContext = createContext<Socket | null>(null);

export function useSocketContext(): Socket {
    return useContext(socketContext) as Socket;
}

export function SocketContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const socketRef = useRef<Socket | null>(null);
    // useEffect(() => {
    //     async function init() {
    //         socketRef.current = await initSocket() as unknown as Socket;
    //         socketRef.current.emit("join");
    //     }
    //     init();
    //     return () => {
    //         socketRef.current?.disconnect();
    //         socketRef.current = null;
    //     };
    // }, []);

    return (
        <socketContext.Provider value={socketRef.current}>
            {children}
        </socketContext.Provider>
    );
}
