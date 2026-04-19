import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DeleteAccountCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Skeleton className="h-5 w-40" />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-full sm:w-64" />
          </div>

          <Skeleton className="h-10 w-full sm:w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccountCardSkeleton;
