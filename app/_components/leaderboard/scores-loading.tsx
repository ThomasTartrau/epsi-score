"use client";

import { Skeleton } from "@/components/ui/skeleton";

const podiumHeights = {
  1: 140,
  2: 110,
  3: 80,
  4: 60,
  5: 40,
};

const podiumPositionOrder = [5, 3, 1, 2, 4];

export function ScoresLoading() {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full pb-10">
        <div className="mt-4 flex items-end justify-between gap-4 px-4 md:px-8">
          {podiumPositionOrder.map((position) => (
            <div
              key={`loading-${position}`}
              className="flex flex-1 justify-center"
            >
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 mb-2">
                  <div className="relative">
                    <Skeleton className="h-16 w-16 rounded-full" />
                  </div>
                </div>

                <Skeleton className="absolute top-16 h-6 w-6 rounded-full" />

                <Skeleton
                  className="w-12 rounded-t-md"
                  style={{
                    height: podiumHeights[position as 1 | 2 | 3 | 4 | 5],
                    marginTop: "1rem",
                  }}
                />

                <div className="mt-2 text-center">
                  <Skeleton className="mb-2 h-6 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full px-4">
        <Skeleton className="mx-auto mb-6 h-8 w-48" />

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-50 dark:bg-green-900/20">
                <th className="w-16 py-3 text-center">
                  <Skeleton className="mx-auto h-5 w-10" />
                </th>
                <th className="w-16 py-3"></th>
                <th className="py-3 text-left">
                  <Skeleton className="h-5 w-20" />
                </th>
                <th className="py-3 text-right">
                  <Skeleton className="ml-auto h-5 w-16" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr
                  key={`loading-team-${index}`}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-transparent"
                      : "bg-green-50/30 dark:bg-green-900/5"
                  }
                >
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-7 w-7 rounded-full" />
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </div>
                  </td>
                  <td className="py-3">
                    <Skeleton className="h-5 w-full max-w-[180px]" />
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <Skeleton className="ml-auto h-5 w-16" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
