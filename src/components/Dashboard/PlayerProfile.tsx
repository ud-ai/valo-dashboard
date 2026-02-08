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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full relative tactical-frame p-6 md:p-8 group overflow-hidden will-change-transform"

        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-30" />
            <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

            <div className="absolute inset-0 bg-gradient-to-br from-accent-red/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="flex flex-col items-center gap-6 relative z-10">

                {/* Avatar */}
                <motion.div
                    whileHover={{ scale: 1.02, rotate: 0.5 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-32 h-32 md:w-48 md:h-48 border-2 border-accent-red shadow-2xl cursor-pointer will-change-transform"

                >
                    <Image
                        src={player.player_card_link}
                        alt={player.player_name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute top-0 right-0 bg-accent-green text-black font-mono text-[9px] px-2 py-0.5 font-black shadow-lg uppercase tracking-tighter">
                        LEVEL {player.player_account_level}
                    </div>

                </motion.div>


                {/* Name & ID */}
                <motion.div
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-center relative"
                >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-accent-red opacity-50 tracking-[0.4em] uppercase">User Profile</div>
                    <h1 className="text-3xl md:text-4xl font-black text-text-primary uppercase tracking-tighter leading-none mb-1">
                        {player.player_name.split('#')[0]}
                    </h1>


                    <div className="text-accent-red font-mono text-[10px] font-bold tracking-[0.2em] opacity-80">
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
                        <div className="w-14 h-14 relative transition-all duration-500 hover:rotate-6 flex items-center justify-center bg-white/5 clip-path-slant p-1">
                            <Image
                                src={getRankImageUrl(player.current_rank)}
                                alt="Rank"
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                        <div>
                            <div className="text-[8px] font-mono text-accent-red/60 uppercase tracking-[0.3em] font-bold">Competitive Rank</div>
                            <div className="text-2xl font-black text-text-primary uppercase italic tracking-tighter">
                                {player.current_rank}
                            </div>
                            <div className="text-[10px] font-mono text-accent-green font-black uppercase mt-1">
                                Peak Rank: RADIANT 0
                            </div>
                        </div>

                    </div>


                    {/* Signature Agent (Most Played) */}
                    <div className="flex items-center gap-4 w-full pt-4 border-t border-white/5">
                        <div className="w-14 h-14 relative overflow-hidden bg-white/5 border border-white/10 hover:border-accent-green/50 transition-colors clip-path-slant">
                            <Image
                                src={getAgentImageUrl("Sova")}
                                alt="Signature Agent"
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        <div>
                            <div className="text-[8px] font-mono text-accent-red/60 uppercase tracking-[0.3em] font-bold">Signature Agent</div>
                            <div className="text-2xl font-black text-text-primary uppercase italic tracking-tighter leading-none">
                                {signatureAgent}
                            </div>

                            <div className="text-[9px] font-mono text-accent-green font-black uppercase mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent-green animate-pulse" />
                                Win Rate: {winRate}%
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </motion.div>

    );
}
