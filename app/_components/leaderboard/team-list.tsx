"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScoresResultInterface } from "@/app/_types/scores.type";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "lucide-react";
import { useMemo } from "react";

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
  // Use useMemo to avoid recalculating on every render
  const otherTeams = useMemo(() => data.scores.slice(5), [data.scores]);

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
      <h3 className="mb-6 text-center font-semibold text-sky-700">
        Autres équipes
      </h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-sky-50">
              <th className="w-16 py-3 text-center font-semibold text-sky-700">
                Pos.
              </th>
              <th className="w-16 py-3"></th>
              <th className="py-3 text-left font-semibold text-sky-700">
                Équipe
              </th>
              <th className="py-3 text-right font-semibold text-sky-700">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {otherTeams.map((team, index) => {
                // Calculate all team-related values in one place
                const position = index + 6;
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

                // Calculate the distance moved for animation intensity
                const jumpDistance =
                  positionChanged && previousPosition
                    ? Math.abs(previousPosition - position)
                    : 0;

                // Generate fixed offsets to avoid re-renders
                const xOffset = positionChanged
                  ? (Math.random() > 0.5 ? 5 : -5) * jumpDistance
                  : 0;

                // Create a stable key for the row that doesn't change with position
                const rowKey = teamName || `position-${position}-${team.score}`;

                return (
                  <motion.tr
                    key={rowKey}
                    layout
                    layoutId={rowKey}
                    initial={isNew ? { opacity: 0, x: -20 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      layoutY: {
                        duration: 0.8,
                        ease: "anticipate",
                      },
                    }}
                    className={cn(
                      "border-b border-sky-100 hover:bg-sky-50/50",
                      index % 2 === 0 ? "bg-white" : "bg-sky-50/30",
                    )}
                  >
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sky-200 text-sm font-semibold text-sky-800"
                          animate={
                            positionChanged
                              ? {
                                  scale: [1, 1.2, 1],
                                  transition: { duration: 0.5 },
                                }
                              : {}
                          }
                        >
                          {position}e
                        </motion.div>
                      </div>
                    </td>

                    <td className="py-3">
                      <div className="relative flex items-center justify-center">
                        <motion.div
                          animate={
                            positionChanged
                              ? {
                                  y: [
                                    positionDirection === "up"
                                      ? jumpDistance * 3
                                      : -jumpDistance * 3,
                                    0,
                                  ],
                                  x: [xOffset, 0],
                                  transition: {
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    duration: 0.7,
                                  },
                                }
                              : {}
                          }
                        >
                          <Avatar className="h-9 w-9 border-2 border-sky-100">
                            <AvatarImage
                              src={`/team/${teamName}.png`}
                              alt={teamName}
                              loading="eager"
                            />
                            <AvatarFallback className="bg-sky-100 font-medium text-sky-800">
                              {shortName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>

                        <AnimatePresence mode="wait">
                          {positionChanged && !isNew && (
                            <motion.div
                              key={`direction-${teamName}-${position}`}
                              className="absolute -top-1 -right-1"
                              initial={{
                                scale: 0,
                                rotate: positionDirection === "up" ? -45 : 45,
                              }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <div
                                className={cn(
                                  "flex h-4 w-4 items-center justify-center rounded-full text-white",
                                  positionDirection === "up"
                                    ? "bg-sky-500"
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
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                          {isNew && (
                            <motion.div
                              key={`new-${teamName}`}
                              className="absolute -top-1 -right-1"
                              initial={{ scale: 0, rotate: 45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-white">
                                <StarIcon size={10} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>

                    <td className="py-3">
                      <motion.span
                        className="font-medium text-sky-900"
                        animate={
                          positionChanged
                            ? {
                                y: [positionDirection === "up" ? 5 : -5, 0],
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                },
                              }
                            : {}
                        }
                      >
                        {shortName}
                      </motion.span>
                    </td>

                    <td className="py-3 pr-4 text-right">
                      <motion.span
                        className="font-bold text-sky-700"
                        animate={
                          positionChanged
                            ? {
                                scale: [1, 1.1, 1],
                                transition: { duration: 0.5 },
                              }
                            : {}
                        }
                      >
                        {team.score.toLocaleString()} pts
                      </motion.span>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
