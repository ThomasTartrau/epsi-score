"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScoreResultInterface } from "@/app/_types/scores.type";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "lucide-react";

interface PodiumItemProps {
  team: ScoreResultInterface;
  position: number;
  previousPosition: number | null;
  isNew: boolean;
}

const podiumHeights = {
  1: 140,
  2: 110,
  3: 80,
  4: 60,
  5: 40,
};

const podiumColors = {
  1: "bg-green-600",
  2: "bg-green-500",
  3: "bg-green-400",
  4: "bg-green-300",
  5: "bg-green-200",
};

export function PodiumItem({
  team,
  position,
  previousPosition,
  isNew,
}: PodiumItemProps) {
  const teamName = team.teamName || `Équipe ${position}`;
  const shortName =
    teamName.length > 15 ? `${teamName.substring(0, 15)}...` : teamName;

  const hasPositionChanged =
    previousPosition !== null && previousPosition !== position;

  const positionDirection =
    hasPositionChanged && previousPosition !== null
      ? previousPosition > position
        ? "up"
        : "down"
      : null;

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: position * 0.1,
        }}
      >
        <div className="relative z-10 mb-2">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <Avatar
              className={cn(
                "h-16 w-16 border-4 shadow-lg",
                position === 1
                  ? "border-yellow-400"
                  : position === 2
                    ? "border-gray-300"
                    : position === 3
                      ? "border-amber-600"
                      : "border-green-200",
              )}
            >
              <AvatarImage src={`/team/${teamName}.png`} alt={teamName} />
              <AvatarFallback className="bg-green-100 text-lg font-bold text-green-800">
                {shortName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {hasPositionChanged && !isNew && (
              <motion.div
                className="absolute -top-2 -right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full p-0 font-bold text-white",
                    positionDirection === "up" ? "bg-green-500" : "bg-rose-500",
                  )}
                >
                  {positionDirection === "up" ? (
                    <ArrowUpIcon size={12} />
                  ) : (
                    <ArrowDownIcon size={12} />
                  )}
                </Badge>
              </motion.div>
            )}

            {isNew && (
              <motion.div
                className="absolute -top-2 -right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-0 text-white">
                  <StarIcon size={12} />
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className={cn(
            "absolute top-14 z-20 flex items-center justify-center rounded-full font-bold",
            "h-6 w-6 text-sm shadow-md",
            position === 1
              ? "bg-yellow-400 text-yellow-800"
              : position === 2
                ? "bg-gray-300 text-gray-700"
                : position === 3
                  ? "bg-amber-600 text-amber-50"
                  : "bg-green-200 text-green-800",
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {position}
        </motion.div>

        <motion.div
          className={cn(
            podiumColors[position as 1 | 2 | 3 | 4 | 5],
            "w-12 rounded-t-md shadow-md",
          )}
          style={{
            height: podiumHeights[position as 1 | 2 | 3 | 4 | 5],
            marginTop: "1rem",
          }}
          initial={{ height: 0 }}
          animate={{ height: podiumHeights[position as 1 | 2 | 3 | 4 | 5] }}
          transition={{
            duration: 0.5,
            delay: position * 0.1,
          }}
        />

        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-bold text-green-700 dark:text-green-300">
            {team.score.toLocaleString()}
          </p>
          <p className="line-clamp-1 max-w-[90px] text-center text-xs font-medium text-green-600 dark:text-green-400">
            {shortName}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
