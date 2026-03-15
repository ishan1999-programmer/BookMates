import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { User } from "lucide-react";

function ErrorFollowersFollowings({ reFetch, username, description }) {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <User />
        </EmptyMedia>
        <EmptyTitle>Oops, something went wrong</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p
          onClick={() => reFetch(username)}
          className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
        >
          Try Again
        </p>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorFollowersFollowings;
