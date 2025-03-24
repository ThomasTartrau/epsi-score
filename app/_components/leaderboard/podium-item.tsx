"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScoreResultInterface } from "@/app/_types/scores.type";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "lucide-react";
import { useMemo } from "react";

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
  1: "bg-sky-600",
  2: "bg-sky-500",
  3: "bg-sky-400",
  4: "bg-sky-300",
  5: "bg-sky-200",
};

export function PodiumItem({
  team,
  position,
  previousPosition,
  isNew,
}: PodiumItemProps) {
  const {
    teamName,
    shortName,
    hasPositionChanged,
    positionDirection,
    jumpDistance,
  } = useMemo(() => {
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

    const jumpDistance =
      hasPositionChanged && previousPosition
        ? Math.abs(previousPosition - position) * 3
        : 0;

    return {
      teamName,
      shortName,
      hasPositionChanged,
      positionDirection,
      jumpDistance,
    };
  }, [team.teamName, previousPosition, position]);

  const xRandomOffset = useMemo(() => (Math.random() > 0.5 ? 5 : -5), []);

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="relative flex flex-col items-center"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: 0.3 },
          layout: {
            type: "spring",
            bounce: 0.2,
            duration: 0.8,
          },
        }}
      >
        <motion.div
          className="relative z-10 mb-2"
          animate={
            hasPositionChanged
              ? {
                  y: [
                    positionDirection === "up" ? jumpDistance : -jumpDistance,
                    0,
                  ],
                  x: [xRandomOffset, 0],
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.6,
                  },
                }
              : {}
          }
        >
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <Avatar
              className={cn(
                "h-16 w-16 border-4 shadow-lg",
                position === 1
                  ? "border-yellow-400"
                  : position === 2
                    ? "border-gray-300"
                    : position === 3
                      ? "border-sky-600"
                      : "border-sky-200",
              )}
            >
              <AvatarImage
                src={`/storage/team/${teamName}.png`}
                alt={shortName}
                loading="eager"
              />
              <AvatarFallback className="bg-sky-100 text-lg font-bold text-sky-800">
                {shortName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <AnimatePresence mode="wait">
              {hasPositionChanged && !isNew && (
                <motion.div
                  key={`direction-${position}-${teamName}`}
                  className="absolute -top-2 -right-2"
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
                  <Badge
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full p-0 font-bold text-white",
                      positionDirection === "up"
                        ? "bg-green-500"
                        : "bg-rose-500",
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
                  key={`new-${teamName}`}
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  <Badge className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 p-0 text-white">
                    <StarIcon size={12} />
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          className={cn(
            "absolute top-14 z-20 flex items-center justify-center rounded-full font-bold",
            "h-6 w-6 text-sm shadow-md",
            position === 1
              ? "bg-yellow-400 text-yellow-800"
              : position === 2
                ? "bg-gray-300 text-gray-700"
                : position === 3
                  ? "bg-sky-600 text-sky-50"
                  : "bg-sky-200 text-sky-800",
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 0.1,
          }}
        >
          {position}
        </motion.div>

        <motion.div
          className={cn(
            podiumColors[position as 1 | 2 | 3 | 4 | 5],
            "w-12 rounded-t-md shadow-md",
          )}
          style={{
            marginTop: "1rem",
          }}
          initial={{ height: 0 }}
          animate={{
            height: podiumHeights[position as 1 | 2 | 3 | 4 | 5],
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
            duration: 0.7,
          }}
        />

        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="text-lg font-bold text-sky-700" variant="outline">
            <motion.span
              animate={
                hasPositionChanged
                  ? {
                      scale: [1, 1.1, 1],
                      transition: { duration: 0.4 },
                    }
                  : {}
              }
            >
              {team.score.toLocaleString()} pts
            </motion.span>
          </Badge>
          <p className="line-clamp-1 max-w-[90px] text-center text-xs font-medium text-sky-600">
            {shortName}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
