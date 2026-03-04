import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Bell } from "lucide-react";

function NoNotifications() {
  return (
    <div className="border-border border-t">
      <Empty className="h-48">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Bell />
          </EmptyMedia>
          <EmptyTitle>No notifications</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            You’ll see new notifications here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent></EmptyContent>
      </Empty>
    </div>
  );
}

export default NoNotifications;
