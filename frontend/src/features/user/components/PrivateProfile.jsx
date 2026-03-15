import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserLock } from "lucide-react";

function PrivateProfile({ description }) {
  return (
    <Empty className="h-48">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserLock />
        </EmptyMedia>
        <EmptyTitle>This profile is private</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}

export default PrivateProfile;
