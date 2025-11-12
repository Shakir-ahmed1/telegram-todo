"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./components/NavBar";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

    // Initialize Telegram WebApp SDK once
  useEffect(() => {
    import("@twa-dev/sdk").then(({ default: WebApp }) => {
      WebApp.ready();
      WebApp.expand();
    });
  }, []);
  // ✅ Dynamically import Telegram WebApp SDK on client only
  useEffect(() => {
    let WebApp: any;

    (async () => {
      const sdk = await import("@twa-dev/sdk");
      WebApp = sdk.default;

      WebApp.ready();
      WebApp.expand();
      WebApp.MainButton.setText("Add Task");
      WebApp.MainButton.onClick(() => handleAddTodo());
    })();

    // optional cleanup
    return () => {
      if (WebApp) WebApp.MainButton.offClick(handleAddTodo);
    };
  }, []);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [...prev, newTodo]);
    setNewTodo("");
    // trigger haptic feedback safely
    import("@twa-dev/sdk").then(({ default: WebApp }) =>
      WebApp.HapticFeedback?.notificationOccurred("success")
    );
  };

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4">
      <Navbar />
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTodo();
              }}
            />
            <Button onClick={handleAddTodo}>Add</Button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo, i) => (
              <li
                key={i}
                className="p-2 rounded-md bg-muted flex justify-between items-center"
              >
                <span>{todo}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setTodos((prev) => prev.filter((_, idx) => idx !== i))
                  }
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
