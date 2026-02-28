import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserRoundX } from "lucide-react";

function NoUsers() {
  return (
    <Empty className="h-48">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserRoundX />
        </EmptyMedia>
        <EmptyTitle>No users found</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          We couldn’t find anyone matching your search.{" "}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}

export default NoUsers;
