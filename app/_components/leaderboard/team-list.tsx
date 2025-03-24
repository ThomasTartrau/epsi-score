"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScoresResultInterface } from "@/app/_types/scores.type";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "lucide-react";

interface TeamListProps {
  data: ScoresResultInterface;
  findPreviousPosition: (teamName: string) => number | null;
  isNewTeam: (teamName: string) => boolean;
}

export function TeamList({
  data,
  findPreviousPosition,
  isNewTeam,
}: TeamListProps) {
  // Nous prenons seulement les équipes classées après la 5ème position
  const otherTeams = data.scores.slice(5);

  if (otherTeams.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mt-12 w-full px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <h3 className="mb-6 text-center font-semibold text-green-700 dark:text-green-300">
        Autres équipes
      </h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <th className="w-16 py-3 text-center font-semibold text-green-700 dark:text-green-300">
                Pos.
              </th>
              <th className="w-16 py-3"></th>
              <th className="py-3 text-left font-semibold text-green-700 dark:text-green-300">
                Équipe
              </th>
              <th className="py-3 text-right font-semibold text-green-700 dark:text-green-300">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {otherTeams.map((team, index) => {
              const position = index + 6; // Position commence à 6
              const teamName = team.teamName || `Équipe ${position}`;
              const shortName =
                teamName.length > 25
                  ? `${teamName.substring(0, 25)}...`
                  : teamName;

              const previousPosition = team.teamName
                ? findPreviousPosition(team.teamName)
                : null;
              const positionChanged =
                previousPosition !== null && previousPosition !== position;
              const positionDirection =
                positionChanged && previousPosition !== null
                  ? previousPosition > position
                    ? "up"
                    : "down"
                  : null;

              const isNew = team.teamName ? isNewTeam(team.teamName) : false;

              return (
                <motion.tr
                  key={`team-${position}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "border-b border-green-100 hover:bg-green-50/50 dark:border-green-900/30 dark:hover:bg-green-900/10",
                    index % 2 === 0
                      ? "bg-white dark:bg-transparent"
                      : "bg-green-50/30 dark:bg-green-900/5",
                  )}
                >
                  {/* Position */}
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-200 text-sm font-semibold text-green-800 dark:bg-green-700 dark:text-green-100">
                        {position}
                      </div>
                    </div>
                  </td>

                  {/* Avatar avec indicateurs de changement */}
                  <td className="py-3">
                    <div className="relative flex items-center justify-center">
                      <Avatar className="h-9 w-9 border-2 border-green-100 dark:border-green-700">
                        <AvatarImage
                          src={`/team/${teamName}.png`}
                          alt={teamName}
                        />
                        <AvatarFallback className="bg-green-100 font-medium text-green-800">
                          {shortName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* Position change indicator */}
                      {positionChanged && !isNew && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-full text-white",
                              positionDirection === "up"
                                ? "bg-green-500"
                                : "bg-rose-500",
                            )}
                          >
                            {positionDirection === "up" ? (
                              <ArrowUpIcon size={10} />
                            ) : (
                              <ArrowDownIcon size={10} />
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* New team indicator */}
                      {isNew && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                            <StarIcon size={10} />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </td>

                  {/* Nom de l'équipe */}
                  <td className="py-3">
                    <span className="font-medium text-green-900 dark:text-green-100">
                      {shortName}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="py-3 pr-4 text-right">
                    <span className="font-bold text-green-700 dark:text-green-300">
                      {team.score.toLocaleString()}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
