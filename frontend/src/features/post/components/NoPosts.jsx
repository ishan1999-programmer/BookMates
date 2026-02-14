import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {BookOpen } from "lucide-react";

function NoPosts() {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon"><BookOpen /></EmptyMedia>
        <EmptyTitle>No Posts yet.</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Follow people to see their updates.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}

export default NoPosts;
