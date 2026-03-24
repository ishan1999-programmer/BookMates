import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Calendar, BookOpen } from "lucide-react";
import { format } from "date-fns";

const ReadingStatusCard = ({
  title,
  authors,
  cover,
  updatedAt,
  type,
  pages,
  currentPage,
}) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-3">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-12 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
              {cover ? (
                <img
                  src={cover}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <h3 className="font-semibold text-lg text-foreground wrap-break-word">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground wrap-break-word">
                {`by ${authors.join(",")}`}
              </p>
            </div>
          </div>

          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {`${type === "want to read" ? "Added" : type === "reading" ? "Started" : "Completed"} ${format(updatedAt, "MMMM yyyy")}`}
          </p>

          {type === "reading" && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="text-xs">{`Page ${currentPage} of ${pages}`}</p>
                <p className="text-xs">{`${Math.round((currentPage / pages) * 100)}%`}</p>
              </div>
              <Progress
                className="h-3"
                value={Math.round((currentPage / pages) * 100)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingStatusCard;
