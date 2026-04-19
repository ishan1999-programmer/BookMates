import { Link } from "react-router-dom";
import { BookOpen, Heart, BookPlus, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const SearchBooksCard = ({
  id,
  title,
  authors,
  cover,
  pages,
  link,
  status,
  submittingIds,
  addBook,
  removeBook,
}) => {
  const handleAddBook = async () => {
    try {
      await addBook({ id, title, authors, cover, pages });
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        position: "top-center",
      });
    }
  };

  console.log("submittingIds", submittingIds);
  

  const handleRemoveBook = async () => {
    try {
      await removeBook(id);
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        position: "top-center",
      });
    }
  };
  return (
    <div className="flex justify-between items-start pb-2 pt-3  border-b border-border gap-2">
      {/* Left */}
      <div className="flex gap-3 min-w-0">
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
          <a
            href={link}
            target="_blank"
            className="font-medium text-sm break-words hover:text-muted-foreground hover:underline cursor-pointer"
          >
            {title}
          </a>

          <p className="text-xs text-primary break-words">
            {authors.length > 0 ? authors.join(", ") : ""}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center flex-shrink-0">
        {status === "not added" && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-[11px] sm:h-8 sm:px-3 sm:text-xs"
            onClick={handleAddBook}
            disabled={submittingIds[id]}
          >
            {submittingIds[id] ? (
              <Spinner />
            ) : (
              <>
                <BookPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs  py-1">
                  Want to Read
                </span>
              </>
            )}
          </Button>
        )}

        {status === "want to read" && (
          <Button
            size="sm"
            className="h-7 px-2 text-[11px] sm:h-8 sm:px-3 sm:text-xs"
            onClick={handleRemoveBook}
            disabled={submittingIds[id]}
          >
            {submittingIds[id] ? (
              <Spinner />
            ) : (
              <>
                <BookCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-[10px] sm:text-xs py-1">Added</span>
              </>
            )}
          </Button>
        )}

        {status === "reading" && (
          <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium whitespace-nowrap">
            Reading
          </span>
        )}

        {status === "read" && (
          <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium whitespace-nowrap">
            Read
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBooksCard;
