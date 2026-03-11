import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PrivacySettingsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-7 w-64" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-5 w-10" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-5 w-10" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettingsCardSkeleton;
