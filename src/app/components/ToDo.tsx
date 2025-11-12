"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTelegram } from "./TelegramProvider";

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const { setMainButton, triggerHaptic } = useTelegram();

  // Sync MainButton with add action
  useEffect(() => {
    const cleanup = setMainButton("Add Task", handleAddTodo);
    return cleanup;
  }, [newTodo]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [...prev, newTodo]);
    setNewTodo("");
    triggerHaptic("success");
  };

  return (
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
  );
}