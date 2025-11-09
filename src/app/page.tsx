"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // import dynamically inside useEffect
    import("@twa-dev/sdk").then(({ default: WebApp }) => {
      WebApp.ready();
      WebApp.expand();

      WebApp.MainButton.setText("Add Task");
      WebApp.MainButton.onClick(() => {
        if (!newTodo.trim()) return;
        setTodos((prev) => [...prev, newTodo]);
        setNewTodo("");
      });
    });
  }, [newTodo]);

  return (
    <div>
      {/* Your UI here */}
    </div>
  );
}
