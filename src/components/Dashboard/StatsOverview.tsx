import { Match, Player } from "@/types";
import { Crosshair, Skull, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MapPerformanceChart from "./MapPerformanceChart";



interface StatsOverviewProps {
    player: Player;
    matches: Match[];
}

export default function StatsOverview({ player, matches }: StatsOverviewProps) {
    const wins = matches.filter((m) => m.result === "Won").length;
    const winRate = Math.round((wins / matches.length) * 100);

    const stats = [
        { label: "Avg ACS", value: player.overall_ACS, icon: Zap, color: "var(--accent-red)" },
        { label: "K/D Ratio", value: player.overall_kd_ratio, icon: Crosshair, color: "#06B6D4" }, // Muted Cyan
        { label: "Headshot %", value: `${player.overall_headshot_percentage}%`, icon: Skull, color: "#8B5CF6" }, // Softer Violet
        { label: "Win Rate", value: `${player.overall_win_percent}%`, icon: Trophy, color: "#22C55E" }, // Standard Green
    ];



    return (
        <div className="w-full h-full flex flex-col gap-6">
            <motion.h3
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-[10px] font-black text-text-muted tracking-[0.4em] uppercase flex items-center gap-3"
            >
                <span className="w-4 h-[1px] bg-accent-red" />
                Performance Dossier
            </motion.h3>


            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.05
                        }
                    }
                }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-end"
            >
                {stats.map((stat, index) => {
                    const isACS = stat.label === "Avg ACS";
                    return (
                        <motion.div
                            key={stat.label}
                            variants={{
                                hidden: { opacity: 0, y: 8 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.25, ease: "easeOut" }
                                }
                            }}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className={cn(
                                "tactical-frame group flex flex-col items-center justify-center text-center cursor-default transition-all duration-300",
                                "p-6 md:p-8 min-h-[140px] md:min-h-[160px]",
                                isACS && "shadow-xl ring-1 ring-accent-red/20 show-notches"
                            )}
                        >
                            <div className={cn(
                                "font-black text-text-primary mb-1 transition-colors tracking-tighter italic leading-none text-3xl md:text-4xl",
                                isACS && "text-4xl md:text-5xl"
                            )}>
                                {stat.value}
                            </div>
                            <div
                                className={cn(
                                    "text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mt-2 flex items-center gap-2",
                                    isACS && "text-accent-red opacity-100"
                                )}
                                style={{ color: !isACS ? stat.color : undefined }}
                            >
                                <stat.icon size={13} />
                                {stat.label}
                            </div>
                            {isACS && (
                                <div className="absolute top-2 right-4 text-[8px] font-black text-accent-red/40 tracking-widest">
                                    /// ANCHOR_METRIC
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>




            {/* Map Performance Micro-Chart */}
            <div className="flex-1 tactical-frame p-4 md:p-10 relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-[10px] font-black text-text-muted mb-8 uppercase tracking-[0.4em] flex items-center gap-3"
                >
                    <span className="w-1.5 h-1px bg-accent-red" />
                    Strategic ACS Report ///
                </motion.div>



                <div className="flex-1 w-full min-h-[200px] relative z-10">
                    <MapPerformanceChart matches={matches} />
                </div>
            </div>

        </div>
    );
}
