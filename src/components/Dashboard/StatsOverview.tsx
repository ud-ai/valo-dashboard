"use client"; // Needs client for framer-motion if using hooks or motion components

import { Player } from "@/types";
import clsx from "clsx";
import { Crosshair, Skull, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface StatsOverviewProps {
    player: Player;
}

export default function StatsOverview({ player }: StatsOverviewProps) {
    const stats = [
        {
            label: "K/D Ratio",
            value: player.overall_kd_ratio,
            color: "text-accent-cyan",
            borderColor: "border-accent-cyan/20",
            bgGradient: "from-accent-cyan/10 to-transparent",
            icon: Crosshair,
            subtext: "Top 5%",
        },
        {
            label: "Headshot %",
            value: `${player.overall_headshot_percentage}%`,
            color: "text-accent-purple",
            borderColor: "border-accent-purple/20",
            bgGradient: "from-accent-purple/10 to-transparent",
            icon: Skull,
            subtext: "Precise",
        },
        {
            label: "Win Rate",
            value: `${player.overall_win_percent}%`,
            color: "text-accent-red",
            borderColor: "border-accent-red/20",
            bgGradient: "from-accent-red/10 to-transparent",
            icon: Trophy,
            subtext: "W/L Ratio",
        },
        {
            label: "ACS",
            value: player.overall_ACS,
            color: "text-text-primary", // Changed to text-primary variable
            borderColor: "border-text-primary/20",
            bgGradient: "from-text-primary/5 to-transparent",
            icon: Zap,
            subtext: "Combat Score",
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    variants={item}
                    className={clsx(
                        "relative overflow-hidden glass-card rounded-xl p-5 group transition-all duration-300 hover:scale-[1.02]",
                        "border-t border-l border-white/10 dark:border-white/10 border-border-color"
                    )}
                >
                    {/* Background Gradient */}
                    <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-80 transition-opacity", stat.bgGradient)} />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-text-secondary text-xs font-bold tracking-wider uppercase">
                                {stat.label}
                            </span>
                            <stat.icon className={clsx("w-5 h-5 opacity-60", stat.color)} />
                        </div>

                        <div>
                            <span className={clsx("text-3xl lg:text-4xl font-black tracking-tight", stat.color)}>
                                {stat.value}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={clsx("h-1 w-full rounded-full bg-bg-card overflow-hidden")}>
                                    <div className={clsx("h-full w-2/3 rounded-full opacity-60", stat.color.replace('text-', 'bg-'))} />
                                </div>
                                <span className="text-[10px] text-text-muted font-mono whitespace-nowrap">{stat.subtext}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
