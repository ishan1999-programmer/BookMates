import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ChangePasswordCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-7 w-64" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-8 w-36 mt-4" />
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCardSkeleton;
