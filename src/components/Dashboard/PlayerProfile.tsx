"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Player } from "@/types";
import { getAgentImageUrl, getRankImageUrl } from "@/lib/valorant-data";

interface PlayerProfileProps {
    player: Player;
}

export default function PlayerProfile({ player }: PlayerProfileProps) {
    const signatureAgent = "Sova";
    const agentMatches = player.matches.filter(m => m.agent === signatureAgent);
    const wins = agentMatches.filter(m => m.result === "Won").length;
    const winRate = agentMatches.length > 0 ? ((wins / agentMatches.length) * 100).toFixed(1) : "0.0";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative glass-card p-6 border border-border-color/10 group overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-red/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="flex flex-col items-center gap-6 relative z-10">

                {/* Avatar */}
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative w-48 h-48 border-2 border-accent-red shadow-2xl cursor-pointer"
                >
                    <Image
                        src={player.player_card_link}
                        alt={player.player_name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute top-2 right-2 bg-accent-red text-white font-mono text-[10px] px-2 py-0.5 font-bold shadow-lg">
                        LVL.{player.player_account_level}
                    </div>
                </motion.div>


                {/* Name & ID */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-black text-text-primary uppercase tracking-tight">
                        {player.player_name.split('#')[0]}
                    </h1>
                    <div className="text-text-secondary font-mono text-sm tracking-widest mt-1">
                        #{player.player_name.split('#')[1]}
                    </div>
                </motion.div>


                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-4 w-full"
                >
                    {/* Rank Section */}
                    <div className="flex items-center gap-4 w-full pt-4 border-t border-border-color/10">
                        <div className="w-12 h-12 relative transition-all duration-500 hover:rotate-6">
                            <Image
                                src={getRankImageUrl(player.current_rank)}
                                alt="Rank"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">Rank</div>
                            <div className="text-xl font-bold text-text-primary uppercase">
                                {player.current_rank}
                            </div>
                        </div>
                    </div>

                    {/* Signature Agent (Most Played) */}
                    <div className="flex items-center gap-4 w-full pt-4 border-t border-border-color/10">
                        <div className="w-12 h-12 relative overflow-hidden bg-bg-card border border-border-color/10 hover:border-accent-red/50 transition-colors">
                            <Image
                                src={getAgentImageUrl("Sova")}
                                alt="Signature Agent"
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div>
                            <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">Signature Agent</div>
                            <div className="text-xl font-bold text-text-primary uppercase leading-tight">
                                {signatureAgent}
                            </div>
                            <div className="text-[10px] font-mono text-accent-red font-bold uppercase mt-0.5">
                                Win Rate: {winRate}%
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>

    );
}
