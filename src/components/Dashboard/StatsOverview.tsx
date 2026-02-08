"use client";

import { Match, Player } from "@/types";
import { Crosshair, Skull, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import MapPerformanceChart from "./MapPerformanceChart";

interface StatsOverviewProps {
    player: Player;
    matches: Match[];
}

export default function StatsOverview({ player, matches }: StatsOverviewProps) {
    const wins = matches.filter((m) => m.result === "Won").length;
    const winRate = Math.round((wins / matches.length) * 100);

    const stats = [
        { label: "K/D Ratio", value: player.overall_kd_ratio, icon: Crosshair, color: "text-chaos-red" },
        { label: "Headshot %", value: `${player.overall_headshot_percentage}%`, icon: Skull, color: "text-accent-cyan" },
        { label: "Win Rate", value: `${player.overall_win_percent}%`, icon: Trophy, color: "text-chaos-green" },
        { label: "Avg ACS", value: player.overall_ACS, icon: Zap, color: "text-accent-purple" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <h3 className="text-xs font-mono text-text-muted tracking-[0.3em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-red" />
                Performance Metrics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="tactical-frame p-4 md:p-5 group flex flex-col items-center justify-center text-center cursor-default min-h-[90px] md:min-h-[100px]"

                    >
                        <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
                            <stat.icon size={32} />
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-text-primary mb-1 group-hover:text-accent-red transition-colors tracking-tight italic">
                            {stat.value}
                        </div>


                        <div className={`text-[9px] font-black uppercase tracking-[0.2em] ${stat.color} opacity-80 mt-1`}>
                            {stat.label}
                        </div>
                    </motion.div>
                ))}

            </div>

            {/* Map Performance Micro-Chart */}
            <div className="flex-1 tactical-frame p-4 md:p-8 relative overflow-hidden flex flex-col">

                <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
                <div className="text-[10px] font-black text-accent-red mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-accent-red" />
                    Map Performance Data ///
                </div>
                <div className="flex-1 w-full min-h-[200px] relative z-10">
                    <MapPerformanceChart matches={matches} />
                </div>
            </div>

        </div>
    );
}
