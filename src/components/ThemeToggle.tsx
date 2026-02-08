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
                "p-2.5 rounded-lg transition-all duration-200",
                "bg-transparent hover:bg-bg-secondary text-text-primary",
                "flex items-center justify-center min-w-[40px] min-h-[40px] cursor-pointer"
            )}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={resolvedTheme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "linear" }}
                >
                    {resolvedTheme === "dark" ? (
                        <Sun className="h-5 w-5 fill-current" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </motion.div>
            </AnimatePresence>

        </button>


    );

}




