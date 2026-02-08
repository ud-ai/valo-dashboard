"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";


export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-2 w-10 h-10" />;
    }

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    };


    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={cn(
                "p-2.5 rounded-lg transition-all active:scale-90",
                "bg-bg-card border border-white/10 text-text-primary hover:text-accent-red",
                "flex items-center justify-center min-w-[40px] min-h-[40px] cursor-pointer"
            )}
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}




