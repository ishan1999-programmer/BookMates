import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Settings } from "lucide-react";


function ErrorSettings({ reFetch }) {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Settings />
        </EmptyMedia>
        <EmptyTitle>Oops, something went wrong</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          We couldn’t load your settings right now. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p
          onClick={() => reFetch()}
          className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
        >
          Try Again
        </p>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorSettings;
