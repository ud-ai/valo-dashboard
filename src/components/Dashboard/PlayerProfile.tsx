import Image from "next/image";
import { Player } from "@/types";

interface PlayerProfileProps {
    player: Player;
}

export default function PlayerProfile({ player }: PlayerProfileProps) {
    return (
        <div className="w-full bg-bg-card/50 dark:bg-bg-secondary/80 backdrop-blur-md rounded-2xl p-6 border border-border-color dark:border-white/15 shadow-sm dark:shadow-lg relative overflow-hidden group hover:border-accent-red/20 dark:hover:border-white/20 transition-colors">
            {/* Valorant Watermark */}
            <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/5 leading-none select-none pointer-events-none z-0 tracking-tighter">
                VALORANT
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8 z-10">
                {/* Avatar Section */}
                <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden ring-4 ring-bg-primary shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                        <Image
                            src={player.player_card_link}
                            alt={player.player_name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-bg-card px-3 py-1 rounded-lg border border-white/10 shadow-lg flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-green-400">Online</span>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center md:text-left space-y-4 w-full">
                    <div>
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-1 justify-center md:justify-start">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-primary drop-shadow-lg">
                                {player.player_name.split('#')[0]}
                            </h1>
                            <span className="text-xl md:text-2xl text-text-muted font-medium mb-1">#{player.player_name.split('#')[1]}</span>
                        </div>
                        <p className="text-sm text-text-muted flex items-center justify-center md:justify-start gap-2">
                            <span className="px-2 py-0.5 rounded bg-bg-primary border border-border-color text-xs text-text-secondary">NA Region</span>
                            <span>•</span>
                            <span>Level {player.player_account_level}</span>
                        </p>
                    </div>

                    {/* Rank & Stats Row */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6">
                        <div className="flex items-center gap-3 bg-bg-card/50 px-4 py-2 rounded-xl border border-border-color backdrop-blur-sm hover:bg-bg-card/80 transition-colors">
                            <div className="w-10 h-10 md:w-12 md:h-12 relative animate-float">
                                <Image
                                    src="https://media.valorant-api.com/competitivetiers/03621f52-4428-b332-236b-0961a3086035/24/largeicon.png"
                                    alt="Rank"
                                    fill
                                    className="object-contain drop-shadow-md"
                                />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">Current Rank</p>
                                <p className="text-lg md:text-xl font-black text-text-primary">{player.current_rank}</p>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-white/10 hidden md:block" />

                        <div className="text-left bg-bg-primary/30 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-sm">
                            <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">Peak Rank</p>
                            <div className="flex items-baseline gap-1">
                                <p className="text-lg font-bold text-accent-purple">
                                    {player.peak_rank.split('e8a3')[0].trim()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
