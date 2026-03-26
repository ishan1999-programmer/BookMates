import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Calendar, BookOpen, Plus, Edit } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ReadingStatusCard = ({
  readId,
  title,
  authors,
  cover,
  updatedAt,
  type,
  pages,
  currentPage,
  isOwnProfile,
  updateCurrentPage,
  updateBookStatus,
}) => {
  const [isPageUpdating, setIsPageUpdating] = useState(false);
  const [newPage, setNewPage] = useState(currentPage);

  const handleUpdatePage = async () => {
    setIsPageUpdating(false);
    try {
      await updateCurrentPage(readId, { oldPage: currentPage, newPage });
    } catch (error) {
      toast.error("Action failed. Please try again.", {
        position: "top-center",
      });
      setIsPageUpdating(true);
    }
  };

  const handleUpdateStatus = async (oldStatus, newStatus) => {
    try {
      await updateBookStatus(readId, { oldStatus, newStatus });
    } catch (error) {
      toast.error("Action failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-3">
        <div className="flex flex-col">
          <div className="flex gap-3 mb-3">
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

          <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3" />
            {`${type === "want to read" ? "Added" : type === "reading" ? "Started" : "Completed"} ${format(updatedAt, "MMMM dd, yyyy")}`}
          </p>

          {type === "reading" && (
            <div className="flex flex-col gap-1 mb-1">
              <div className="flex justify-between">
                <p className="text-xs">
                  Page {currentPage} of {pages}
                </p>

                <p className="text-xs">{`${Math.round((currentPage / pages) * 100)}%`}</p>
              </div>
              <Progress
                className="h-3"
                value={Math.round((currentPage / pages) * 100)}
              />
            </div>
          )}
          {isOwnProfile && type === "reading" && (
            <div className="mb-3">
              {isPageUpdating ? (
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="flex items-center gap-1">
                    <span>Page</span>
                    <Input
                      type="text"
                      autoFocus
                      value={newPage}
                      className="w-10 h-5 text-xs px-1 py-0"
                      onChange={(e) => {
                        let value = e.target.value;

                        if (!/^\d*$/.test(value)) return;

                        if (value !== "") {
                          const num = Number(value);
                          if (num < 1 || num > pages) return;
                        }

                        setNewPage(value);
                      }}
                    />
                    <span>of {pages}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      className="h-6 px-2"
                      onClick={handleUpdatePage}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2"
                      onClick={() => setIsPageUpdating(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{`Currently on page ${currentPage}`}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs  self-start"
                    onClick={() => setIsPageUpdating(true)}
                  >
                    <Edit
                      className="h-3 w-3 cursor-pointer text-muted-foreground"
                      onClick={() => setIsPageUpdating(true)}
                    />
                    Update
                  </Button>
                </div>
              )}
            </div>
          )}
          {isOwnProfile && (type === "reading" || type === "want to read") && (
            <div className="flex gap-2 flex-wrap">
              {type === "want to read" && (
                <Button
                  size="sm"
                  className="flex gap-1 bg-blue-200 text-blue-700 hover:bg-blue-100"
                  onClick={() => handleUpdateStatus("want to read", "reading")}
                >
                  <Plus />
                  Currently Reading
                </Button>
              )}
              <Button
                size="sm"
                className="flex gap-1 bg-green-200 text-green-700 hover:bg-green-100"
                onClick={() => handleUpdateStatus("reading", "read")}
              >
                <Plus />
                Read
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingStatusCard;
