"use client";

import Navbar from "./components/NavBar";
import { TelegramProvider } from "./components/TelegramProvider";
import ToDo from "./components/ToDo";

export default function Home() {
  return (
    <TelegramProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4">
        <Navbar />
        <ToDo />
      </div>
    </TelegramProvider>
  );
}