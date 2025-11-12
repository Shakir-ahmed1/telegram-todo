"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type UserInfo = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
};

export default function Navbar() {
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        // Dynamically import Telegram WebApp SDK only on the client
        (async () => {
            const { default: WebApp } = await import("@twa-dev/sdk");
            WebApp.ready();
            WebApp.expand();
            const defaultTGUser = WebApp.initDataUnsafe?.user ?? {
                id: 1,
                first_name: "Demo",
                last_name: "User",
                username: "demo_user",
                photo_url: "https://picsum.photos/200/300",
            };
            const tgUser = WebApp.initDataUnsafe?.user;
            if (tgUser) setUser(tgUser);
            else setUser(defaultTGUser)
        })();
    }, []);

    return (
        <Card className="w-full p-3 flex items-center justify-between bg-muted mb-4 shadow-md">
            <div className="flex items-center gap-3">
                {user?.photo_url && (
                    <Image
                        src={user.photo_url}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                )}
                <div>
                    <p className="font-semibold">
                        {user
                            ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
                            : "Guest"}
                    </p>
                    {user?.username && (
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                    )}
                </div>
            </div>
            <span className="text-sm text-muted-foreground">To-Do List</span>
        </Card>
    );
}
