import { io, Socket } from "socket.io-client";
import environment from "@/enviroment/enviroment";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const url = environment || undefined;
    socket = io(url, {
      withCredentials: true,
      autoConnect: true,
    });
  }
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
