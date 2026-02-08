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
                        whileHover={{ y: -2 }}
                        className="bg-bg-card border border-border-color/10 p-4 group"
                    >
                        <div className="text-2xl font-black text-text-primary mb-1 group-hover:text-accent-red transition-colors">
                            {stat.value}
                        </div>
                        <div className={`text-[10px] font-mono uppercase tracking-widest ${stat.color} flex items-center gap-2 opacity-60`}>
                            <stat.icon size={12} />
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Map Performance Micro-Chart */}
            <div className="flex-1 bg-bg-card border border-border-color/10 p-6 relative overflow-hidden flex flex-col">
                <div className="text-[10px] font-mono text-text-muted mb-6 uppercase tracking-widest">Map Win Rate Analysis</div>
                <div className="flex-1 w-full min-h-[200px]">
                    <MapPerformanceChart matches={matches} />
                </div>
            </div>
        </div>
    );
}
