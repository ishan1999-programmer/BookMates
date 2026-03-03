import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserCheck } from "lucide-react";

function NoFollowRequests() {
  return (
    <div className="border-border border-t">
      <Empty className="h-48">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserCheck />
          </EmptyMedia>
          <EmptyTitle>No pending requests</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            You’ll see new follow requests here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent></EmptyContent>
      </Empty>
    </div>
  );
}

export default NoFollowRequests;
