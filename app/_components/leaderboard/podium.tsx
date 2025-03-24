"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PodiumItem } from "./podium-item";
import { ScoresResultInterface } from "@/app/_types/scores.type";
import { useMemo } from "react";

interface PodiumProps {
  data: ScoresResultInterface;
  findPreviousPosition: (teamName: string) => number | null;
  isNewTeam: (teamName: string) => boolean;
}

const podiumPositionOrder = [5, 3, 1, 2, 4];

export function Podium({ data, findPreviousPosition, isNewTeam }: PodiumProps) {
  // Use useMemo to avoid recalculating on every render
  const displayTeams = useMemo(() => {
    const topFiveTeams = data.scores.slice(0, 5);
    const teams = [...topFiveTeams];

    while (teams.length < 5) {
      teams.push({
        teamName: `Équipe ${teams.length + 1}`,
        score: 0,
      });
    }

    return teams;
  }, [data.scores]);

  return (
    <motion.div
      className="w-full pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-4 flex items-end justify-between gap-4 px-4 md:px-8">
        <AnimatePresence mode="wait">
          {podiumPositionOrder.map((position) => {
            const actualPosition = position;
            const team = displayTeams[actualPosition - 1];

            if (!team) return null;

            // Create these values here to avoid recalculation in PodiumItem
            const previousPosition = team.teamName
              ? findPreviousPosition(team.teamName)
              : null;

            const isNew = team.teamName ? isNewTeam(team.teamName) : false;

            // Create a stable key for layout animations
            const itemKey = team.teamName || `podium-${position}-${team.score}`;

            return (
              <motion.div
                key={itemKey}
                layout
                layoutId={itemKey}
                className="flex flex-1 justify-center"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.8,
                }}
              >
                <PodiumItem
                  team={team}
                  position={actualPosition}
                  previousPosition={previousPosition}
                  isNew={isNew}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
