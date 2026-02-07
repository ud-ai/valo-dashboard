import playerData from "@/data/player.json";
import PlayerProfile from "@/components/Dashboard/PlayerProfile";
import StatsOverview from "@/components/Dashboard/StatsOverview";
import MatchHistory from "@/components/Dashboard/MatchHistory";
import MapPerformanceChart from "@/components/Dashboard/MapPerformanceChart";
import { Player } from "@/types";

// Type assertion for the imported JSON data
const player = playerData as unknown as Player;

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <header className="mb-8 text-center md:text-left">
        <div className="inline-block bg-gradient-1 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 animate-pulse text-white">
          Frontend Intern Assignment
        </div>
      </header>

      <main className="space-y-8">
        {/* Player Profile Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <PlayerProfile player={player} />
        </section>

        {/* Stats Overview Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <StatsOverview player={player} />
        </section>

        {/* Map Performance Chart Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <MapPerformanceChart matches={player.matches} />
        </section>

        {/* Match History Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <MatchHistory matches={player.matches} />
        </section>
      </main>

      <footer className="mt-12 text-center text-text-muted text-sm border-t border-border-color pt-8">
        <p>ValoCoach Frontend Intern Assessment</p>
      </footer>
    </div>
  );
}
