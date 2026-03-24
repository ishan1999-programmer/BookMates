import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReadingStatusCard from "./ReadingStatusCard";
import NoReadings from "./NoReadings";

const ReadingStatusTabs = ({ data, getUserReads, isOwnProfile }) => {
  const wantToRead = data.filter((book) => book.status === "want to read");
  const reading = data.filter((book) => book.status === "reading");
  const read = data.filter((book) => book.status === "read");

  return (
    <Tabs defaultValue="want to read">
      <TabsList className="flex">
        <TabsTrigger
          className="flex-1 flex gap-2 items-center"
          value="want to read"
        >
          Want To Read
        </TabsTrigger>
        <TabsTrigger className="flex-1 flex gap-2 items-center" value="reading">
          Currently Reading
        </TabsTrigger>
        <TabsTrigger className="flex-1 flex gap-2 items-center" value="read">
          Read
        </TabsTrigger>
      </TabsList>
      <TabsContent value="want to read">
        {wantToRead.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wantToRead.map((book) => (
              <ReadingStatusCard
                title={book.bookTitle}
                authors={book.bookAuthors}
                cover={book.bookCover}
                updatedAt={book.updatedAt}
                type={book.status}
              />
            ))}
          </div>
        ) : (
          <NoReadings
            title="No books yet"
            description={
              isOwnProfile
                ? "Add books you want to read and build your reading list"
                : "This user hasn’t added any books to their wishlist"
            }
          />
        )}
      </TabsContent>
      <TabsContent value="reading">
        {reading.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {reading.map((book) => (
              <ReadingStatusCard
                title={book.bookTitle}
                authors={book.bookAuthors}
                cover={book.bookCover}
                updatedAt={book.updatedAt}
                type={book.status}
                pages={book.bookPages}
                currentPage={book.currentPage}
              />
            ))}
          </div>
        ) : (
          <NoReadings
            title={isOwnProfile ? "Nothing being read" : "Not reading anything"}
            description={
              isOwnProfile
                ? "Start reading a book to track your progress here"
                : "This user isn’t reading any books right now"
            }
          />
        )}
      </TabsContent>
      <TabsContent value="read">
        {read.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {read.map((book) => (
              <ReadingStatusCard
                title={book.bookTitle}
                authors={book.bookAuthors}
                cover={book.bookCover}
                updatedAt={book.updatedAt}
                type={book.status}
              />
            ))}
          </div>
        ) : (
          <NoReadings
            title="No books finished yet"
            description={
              isOwnProfile
                ? "Finish a book to see it appear in your completed list"
                : "This user hasn’t completed any books yet"
            }
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ReadingStatusTabs;
