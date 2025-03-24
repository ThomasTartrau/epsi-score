"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { Podium } from "./podium";
import { TeamList } from "./team-list";
import { ScoresLoading } from "./scores-loading";
import { ScoresResultInterface } from "@/app/_types/scores.type";
import { getScores } from "@/app/_actions/scores.actions";

const fetcher = async () => {
  try {
    return await getScores();
  } catch (error) {
    console.error("Error fetching scores:", error);
    return { scores: [] };
  }
};

export default function ClientLeaderboard() {
  const { data, error, isLoading } = useSWR<ScoresResultInterface>(
    "scores-data",
    fetcher,
    {
      refreshInterval: 3000,
      revalidateOnFocus: true,
      suspense: false,
      dedupingInterval: 1000,
      errorRetryInterval: 5000,
    },
  );

  const [previousScores, setPreviousScores] =
    useState<ScoresResultInterface | null>(null);

  // Use a ref to track data changes without causing re-renders
  const dataRef = useRef<ScoresResultInterface | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip if data hasn't changed or is loading
    if (!data || isLoading) return;

    // On first load, just set previous scores without animation
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setPreviousScores({ scores: [...data.scores] });
      dataRef.current = data;
      return;
    }

    // Compare current data with previous data
    if (
      dataRef.current &&
      JSON.stringify(dataRef.current) !== JSON.stringify(data)
    ) {
      // Store the new data for the next comparison
      dataRef.current = data;

      // After animations complete, update the previous scores
      const timer = setTimeout(() => {
        setPreviousScores({ scores: [...data.scores] });
      }, 3500);

      return () => clearTimeout(timer);
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
    <div>
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
    </div>
  );
}
