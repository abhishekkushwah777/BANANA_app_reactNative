import { io, Socket } from "socket.io-client";
import { getToken } from "../services/authStorage";
import { API_URL } from "../config/env";

let socket: Socket | null = null;

export async function connectSocket() {
  const token = await getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  // Don't create another connection if already connected
  if (socket) {
    return socket;
  }

  socket = io(API_URL, {
    auth: {
      token,
    },
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}