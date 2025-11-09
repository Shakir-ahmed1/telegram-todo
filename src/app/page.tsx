"use client";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    WebApp.ready();
    WebApp.expand(); // Make full height

    WebApp.MainButton.setText("Add Todo");
    WebApp.MainButton.onClick(() => {
      if (newTodo.trim()) {
        setTodos((prev) => [...prev, newTodo]);
        setNewTodo("");
      }
    });
  }, [newTodo]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Telegram To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new task..."
        className="p-2 rounded text-black mb-4 w-full max-w-sm"
      />
      <ul className="w-full max-w-sm space-y-2">
        {todos.map((todo, i) => (
          <li key={i} className="p-2 bg-gray-700 rounded">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}
