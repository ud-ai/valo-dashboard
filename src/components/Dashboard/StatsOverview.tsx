"use client";

import { Match, Player } from "@/types";
import clsx from "clsx";
import { Crosshair, Skull, Trophy, Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import MapPerformanceChart from "./MapPerformanceChart";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface StatsOverviewProps {
    player: Player;
    matches: Match[];
}

export default function StatsOverview({ player, matches }: StatsOverviewProps) {
    // Generate some dummy chart data if not available on player object, or use a method to extract it from matches
    // For now, using static data as per previous design, but ideally this comes from props
    const chartData = [
        { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
    ];

    const stats = [
        {
            label: "Win Rate",
            value: `${player.overall_win_percent}%`,
            icon: Trophy,
            trend: "+2.4%", // Dummy trend for now
            color: "text-accent-cyan",
            chartData: chartData
        },
        {
            label: "K/D Ratio",
            value: player.overall_kd_ratio,
            icon: Target,
            trend: "+0.1",
            color: player.overall_kd_ratio >= 1 ? "text-accent-cyan" : "text-accent-red",
        },
        {
            label: "Headshot %",
            value: `${player.overall_headshot_percentage}%`,
            icon: Skull,
            trend: "-1.2%",
            color: "text-accent-purple",
        },
        {
            label: "Avg Combat Score",
            value: player.overall_ACS,
            icon: Zap,
            trend: "+12",
            color: "text-yellow-400",
        },
    ];

    return (
        <div className="mt-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
                <div className="bg-bg-secondary/20 p-4 md:p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-accent-cyan" />
                        Performance Trend
                    </h3>
                    <div className="h-48 md:h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorKd" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="uv" stroke="#00d4aa" fillOpacity={1} fill="url(#colorKd)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Map Performance Chart */}
                <MapPerformanceChart matches={matches} />
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, trend, color }: any) {
    return (
        <motion.div
            whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
            className="bg-bg-card/50 dark:bg-bg-secondary/30 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-border-color dark:border-white/5 shadow-sm dark:shadow-none relative overflow-hidden group"
        >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/10 group-hover:border-white/30 transition-colors rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/10 group-hover:border-white/30 transition-colors rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/10 group-hover:border-white/30 transition-colors rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/10 group-hover:border-white/30 transition-colors rounded-br-lg" />

            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
                <Icon size={48} />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-lg bg-bg-primary/50 ${color.replace('text-', 'bg-').replace('-400', '-400/10').replace('accent-', 'accent-').replace('cyan', 'cyan/10').replace('red', 'red/10').replace('purple', 'purple/10').replace('yellow', 'yellow-400/10')} `}>
                        <Icon size={20} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-bg-primary/50 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {trend}
                    </span>
                </div>

                <p className="text-text-secondary text-xs uppercase font-bold tracking-wider mb-1">{label}</p>
                <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">{value}</h3>
            </div>
        </motion.div>
    )
}
