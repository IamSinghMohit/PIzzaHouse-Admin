import { io } from "socket.io-client";
export async function initSocket(){
    return  io("http://localhost:3001", {
        timeout: 100000,
        forceNew: true,
    }) 
}
