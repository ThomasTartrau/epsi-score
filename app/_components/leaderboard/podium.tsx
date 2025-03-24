"use client";

import { motion } from "framer-motion";
import { PodiumItem } from "./podium-item";
import { ScoresResultInterface } from "@/app/_types/scores.type";

interface PodiumProps {
  data: ScoresResultInterface;
  findPreviousPosition: (teamName: string) => number | null;
  isNewTeam: (teamName: string) => boolean;
}

// Ordre d'affichage des positions sur le podium (de gauche à droite)
const podiumPositionOrder = [5, 3, 1, 2, 4];

export function Podium({ data, findPreviousPosition, isNewTeam }: PodiumProps) {
  const topFiveTeams = data.scores.slice(0, 5);

  // S'assurer que nous avons toujours 5 positions, même si nous avons moins de 5 équipes
  const displayTeams = [...topFiveTeams];

  // Ajouter des équipes vides si nécessaire pour remplir le podium
  while (displayTeams.length < 5) {
    displayTeams.push({
      teamName: `Équipe ${displayTeams.length + 1}`,
      score: 0,
    });
  }

  return (
    <motion.div
      className="w-full pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-4 flex items-end justify-between gap-4 px-4 md:px-8">
        {podiumPositionOrder.map((position) => {
          const actualPosition = position;
          const team = displayTeams[actualPosition - 1];

          if (!team) return null;

          const previousPosition = team.teamName
            ? findPreviousPosition(team.teamName)
            : null;

          const isNew = team.teamName ? isNewTeam(team.teamName) : false;

          return (
            <div
              key={`podium-${position}`}
              className="flex flex-1 justify-center"
            >
              <PodiumItem
                team={team}
                position={actualPosition}
                previousPosition={previousPosition}
                isNew={isNew}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
