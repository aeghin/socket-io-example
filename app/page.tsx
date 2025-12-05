"use client";

import { useState, useEffect } from "react";
import { useSocket } from "./hooks/useSocket";

export default function HomePage() {
  const socket = useSocket();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handlePong = () => {
      setLogs(prev => [...prev, "➡️  Received pong"]);
    };

    socket.on("pong", handlePong);

    return () => {
      socket.off("pong", handlePong);
    };
  }, [socket]);

  const sendPing = () => {
    if (!socket) return;
    setLogs(prev => [...prev, "⬅️  Sent ping"]);
    socket.emit("ping");
  };

  return (
    <main style={{ padding: "40px" }}>
      <button onClick={sendPing}>Send Ping</button>

      <ul style={{ marginTop: "20px" }}>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </main>
  );
}
