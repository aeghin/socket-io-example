import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "http://localhost:3000" }});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("ping", () => {
    console.log("Received: ping");
    socket.emit("pong");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(4000, () =>
  console.log("Socket.IO server running at http://localhost:4000")
);
