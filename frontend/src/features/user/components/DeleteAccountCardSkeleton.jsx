import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DeleteAccountCardSkeleton = () => {
  return (
    <Card >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Skeleton className="h-7 w-64" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccountCardSkeleton;
