import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

const ReadingStatusTabsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-3">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Skeleton className="w-12 h-16" />
                <div className="flex flex-col gap-2 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-3">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Skeleton className="w-12 h-16" />
                <div className="flex flex-col gap-2 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-3">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Skeleton className="w-12 h-16" />
                <div className="flex flex-col gap-2 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStatusTabsSkeleton;
