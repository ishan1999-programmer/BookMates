import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileSettingsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-7 w-64" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-5 w-20 mb-2" />
          <div className="flex flex-wrap gap-2">
            {new Array(24).fill(0).map((val, idx) => (
              <Skeleton key={idx} className="h-4 w-20" />
            ))}
          </div>
        </div>
        <Skeleton className="h-8 w-28 mt-4" />
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsCardSkeleton;
