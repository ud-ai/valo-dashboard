"use client";

import { useMemo } from "react";
import { Match } from "@/types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
} from "recharts";

interface MapPerformanceChartProps {
    matches: Match[];
}

export default function MapPerformanceChart({ matches }: MapPerformanceChartProps) {
    const data = useMemo(() => {
        const mapStats: Record<string, { wins: number; total: number; kills: number; deaths: number }> = {};

        matches.forEach((match) => {
            if (!mapStats[match.map]) {
                mapStats[match.map] = { wins: 0, total: 0, kills: 0, deaths: 0 };
            }
            mapStats[match.map].total += 1;
            if (match.result === "Won") {
                mapStats[match.map].wins += 1;
            }
            mapStats[match.map].kills += match.kills;
            mapStats[match.map].deaths += match.deaths;
        });

        return Object.keys(mapStats).map((map) => {
            const stats = mapStats[map];
            return {
                name: map,
                winRate: Math.round((stats.wins / stats.total) * 100),
                kdRatio: parseFloat((stats.kills / stats.deaths).toFixed(2)),
            };
        }).sort((a, b) => b.winRate - a.winRate);
    }, [matches]);

    return (
        <div className="bg-bg-card border border-border-color rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-text-primary">Map Performance</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            stroke="var(--text-secondary)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="var(--text-secondary)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="var(--text-secondary)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)'
                            }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                            cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar yAxisId="left" dataKey="winRate" name="Win Rate %" fill="#00d4aa" radius={[4, 4, 0, 0]} maxBarSize={50} />
                        <Bar yAxisId="right" dataKey="kdRatio" name="K/D Ratio" fill="#ff4655" radius={[4, 4, 0, 0]} maxBarSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
