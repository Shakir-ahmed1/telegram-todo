"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface TelegramContextType {
  isReady: boolean;
  setMainButton: (text: string, onClick: () => void) => void;
  triggerHaptic: (type: "success" | "error" | "warning") => void;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [WebApp, setWebApp] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const sdk = await import("@twa-dev/sdk");
        const app = sdk.default;
        app.ready();
        app.expand();
        setWebApp(app);
        setIsReady(true);
      } catch (err) {
        console.warn("Telegram WebApp SDK not available", err);
      }
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const setMainButton = (text: string, onClick: () => void) => {
    if (!WebApp) return;

    WebApp.MainButton.setText(text);
    WebApp.MainButton.show();
    WebApp.MainButton.offClick(onClick); // Prevent duplicate listeners
    WebApp.MainButton.onClick(onClick);

    return () => {
      WebApp.MainButton.offClick(onClick);
      WebApp.MainButton.hide();
    };
  };

  const triggerHaptic = (type: "success" | "error" | "warning") => {
    WebApp?.HapticFeedback?.notificationOccurred?.(type);
  };

  return (
    <TelegramContext.Provider value={{ isReady, setMainButton, triggerHaptic }}>
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) throw new Error("useTelegram must be used within TelegramProvider");
  return context;
};