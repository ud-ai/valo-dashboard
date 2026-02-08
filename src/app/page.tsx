"use client";

import React, { useState } from "react";
import playerData from "@/data/player.json";
import PlayerProfile from "@/components/Dashboard/PlayerProfile";
import StatsOverview from "@/components/Dashboard/StatsOverview";
import MatchHistory from "@/components/Dashboard/MatchHistory";
import MatchDetails from "@/components/Dashboard/MatchDetails";
import { Player, Match } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Map UUIDs for background images
const MAP_UUIDS: Record<string, string> = {
  "Ascent": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
  "Bind": "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba",
  "Breeze": "2fb9a4fd-47b8-4e7d-a969-74b4046ebd53",
  "Fracture": "b529448b-4d60-346e-e89e-00a4c527a405",
  "Haven": "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047",
  "Icebox": "e2ad5c54-4114-a870-9641-8ea21279579a",
  "Lotus": "2fe4ed3a-450a-948b-6d6b-e89a78e680a9",
  "Pearl": "fd267378-4d1d-484f-ff52-77821ed10dc2",
  "Split": "d960549e-485c-e861-8d71-aa9d1aed12a2",
  "Sunset": "92584fbe-486a-b1b2-9faa-39b0f486b498",
  "Abyss": "224b0a95-48b9-f703-1bd8-67aca101a61f",
};

// Type assertion for the imported JSON data
const player = playerData as unknown as Player;

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const mapId = selectedMatch ? MAP_UUIDS[selectedMatch.map] : null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-primary text-text-primary selection:bg-accent-red selection:text-white transition-colors duration-500">

      {/* IMMERSIVE BACKGROUND */}
      <AnimatePresence>
        {mapId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0"
          >
            <Image
              src={`https://media.valorant-api.com/maps/${mapId}/splash.png`}
              alt="Map Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 p-4 md:p-8 w-full max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PROFILE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <PlayerProfile player={player} />
          </motion.div>

          {/* STATS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <StatsOverview player={player} matches={player.matches} />
          </motion.div>
        </div>

        {/* MATCH HISTORY SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <MatchHistory
            matches={player.matches}
            onMatchClick={(match) => setSelectedMatch(match)}
          />
        </motion.div>
      </main>

      {/* MATCH DETAILS MODAL */}
      <MatchDetails
        match={selectedMatch as Match}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      <footer className="relative z-10 mt-24 py-12 text-center text-accent-red font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">
        <p>/// VALOCOACH PROTOCOL_V3 /// SYSTEM_STABLE ///</p>
      </footer>
    </div>
  );
}

