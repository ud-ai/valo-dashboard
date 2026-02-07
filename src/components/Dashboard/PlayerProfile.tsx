import Image from "next/image";
import { Player } from "@/types";

interface PlayerProfileProps {
    player: Player;
}

export default function PlayerProfile({ player }: PlayerProfileProps) {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden glass border border-white/5 shadow-2xl">
            {/* Hero Background Banner */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-red/20 to-accent-purple/20 opacity-50 z-0" />
            <div className="absolute inset-0 bg-[url('https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/splash.png')] bg-cover bg-center opacity-10 blur-sm z-0 mix-blend-overlay" />

            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                {/* Avatar with Glow */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-1 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-bg-primary overflow-hidden shadow-2xl">
                        <Image
                            src={player.player_card_link}
                            alt={player.player_name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-bg-card border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Level {player.player_account_level}
                    </div>
                </div>

                {/* Player Info */}
                <div className="flex-1 text-center md:text-left space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-accent-cyan tracking-wider uppercase mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                        Online
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-lg">
                        {player.player_name.split('#')[0]}
                        <span className="text-2xl md:text-3xl text-white/40 font-medium ml-1">
                            #{player.player_name.split('#')[1]}
                        </span>
                    </h1>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-bg-primary/50 border border-white/5 backdrop-blur-md">
                            <div className="w-10 h-10 relative">
                                {/* Placeholder for rank icon if available, or just use text styling */}
                                <div className="absolute inset-0 bg-accent-red/20 rounded-full blur-md" />
                                <div className="relative w-full h-full flex items-center justify-center font-bold text-accent-red">
                                    R
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">Current Rank</p>
                                <p className="text-lg font-bold text-white">{player.current_rank}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-bg-primary/50 border border-white/5 backdrop-blur-md">
                            <div className="text-left">
                                <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">Peak Rank</p>
                                <p className="text-lg font-bold text-accent-purple">{player.peak_rank}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Placement */}
                <div className="hidden md:block text-right">
                    <p className="text-sm text-text-secondary uppercase tracking-widest font-bold mb-1">Regional Rank</p>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
                        #{player.leaderboard_placement}
                    </p>
                </div>
            </div>
        </div>
    );
}
