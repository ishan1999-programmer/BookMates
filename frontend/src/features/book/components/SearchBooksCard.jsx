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
    <div
      className={`flex justify-between items-start pb-2 pt-3 pl-2 pr-4 border-b border-border`}
    >
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
        <div className="flex flex-col">
          <a
            href={link}
            target="_blank"
            className="font-medium text-sm wrap-break-word w-48 hover:text-muted-foreground hover:underline cursor-pointer"
          >
            {title}
          </a>
          <p className="text-xs text-primary wrap-break-word w-48">
            {authors.length > 0 ? authors.join(",") : ""}
          </p>
        </div>
      </div>
      <div className="flex items-center ml-3 flex-shrink-0">
        {status === "not added" && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-[128px] px-3 text-xs"
            onClick={handleAddBook}
            disabled={submittingIds[id]}
          >
            {submittingIds[id] ? (
              <Spinner />
            ) : (
              <>
                <BookPlus className="h-4 w-4" />
                Want to Read
              </>
            )}
          </Button>
        )}

        {status === "want to read" && (
          <Button
            size="sm"
            className="h-8 w-[86px] px-3 text-xs"
            onClick={handleRemoveBook}
            disabled={submittingIds[id]}
          >
            {submittingIds[id] ? (
              <Spinner />
            ) : (
              <>
                <BookCheck className="h-4 w-4" />
                Added
              </>
            )}
          </Button>
        )}

        {status === "reading" && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
            Currently Reading
          </span>
        )}

        {status === "read" && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            Read
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBooksCard;
