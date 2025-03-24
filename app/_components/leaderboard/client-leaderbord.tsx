"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import { Podium } from "./podium";
import { TeamList } from "./team-list";
import { ScoresLoading } from "./scores-loading";
import { ScoresResultInterface } from "@/app/_types/scores.type";
import { getScores } from "@/app/_actions/scores.actions";

// Custom fetcher for SWR that uses our server action
const fetcher = async () => {
  try {
    return await getScores();
  } catch (error) {
    console.error("Error fetching scores:", error);
    return { scores: [] };
  }
};

export default function ClientLeaderboard() {
  // Use SWR for data fetching with automatic revalidation
  const { data, error, isLoading } = useSWR<ScoresResultInterface>(
    "scores-data",
    fetcher,
    {
      refreshInterval: 3000, // Refresh every 3 seconds
      revalidateOnFocus: true,
      suspense: false,
      dedupingInterval: 1000, // Dedupe calls within 1 second
      errorRetryInterval: 5000, // Wait 5 seconds before retrying after error
    },
  );

  const [previousScores, setPreviousScores] =
    useState<ScoresResultInterface | null>(null);

  // Update previous scores when data changes
  useEffect(() => {
    if (data && !isLoading) {
      setPreviousScores((prevScores) => {
        // Only update previous scores if we already have data
        if (prevScores) {
          return { scores: [...prevScores.scores] };
        }
        // First load, initialize previous scores
        return { scores: [...data.scores] };
      });
    }
  }, [data, isLoading]);

  const findPreviousPosition = useCallback(
    (teamName: string): number | null => {
      if (!previousScores) return null;
      const prevIndex = previousScores.scores.findIndex(
        (score) => score.teamName === teamName,
      );
      return prevIndex !== -1 ? prevIndex + 1 : null;
    },
    [previousScores],
  );

  const isNewTeam = useCallback(
    (teamName: string): boolean => {
      if (!previousScores) return false;
      return !previousScores.scores.some(
        (score) => score.teamName === teamName,
      );
    },
    [previousScores],
  );

  if (isLoading && !data) {
    return <ScoresLoading />;
  }

  if (error || !data) {
    return (
      <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
        <p>Impossible de charger les scores</p>
      </div>
    );
  }

  return (
    <>
      <Podium
        data={data}
        findPreviousPosition={findPreviousPosition}
        isNewTeam={isNewTeam}
      />
      {data.scores.length > 5 && (
        <TeamList
          data={data}
          findPreviousPosition={findPreviousPosition}
          isNewTeam={isNewTeam}
        />
      )}

      <motion.div
        className="mt-8 text-center text-xs text-green-600 opacity-70 dark:text-green-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2 }}
      >
        Dernière mise à jour : {new Date().toLocaleTimeString()}
      </motion.div>
    </>
  );
}
