import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 pb-5 border-border border-b">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="w-16 h-24 rounded" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-50" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div>
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3 pb-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCardSkeleton;
