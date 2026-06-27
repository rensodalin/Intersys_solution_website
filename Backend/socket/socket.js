import { Server } from "socket.io";

let io;

export function initSocket(server) {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
  ];
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`[socket] Connected: ${socket.id}`);

    socket.on("join-admin", () => {
      socket.join("admin");
      console.log(`[socket] ${socket.id} joined admin room`);
    });

    socket.on("join-conversation", (email) => {
      if (email && typeof email === "string") {
        socket.join(email);
        console.log(`[socket] ${socket.id} joined room: ${email}`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`[socket] Disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initSocket first.");
  }
  return io;
}
