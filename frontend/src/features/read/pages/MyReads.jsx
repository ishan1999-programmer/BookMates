import ReadingStatusTabs from "../components/ReadingStatusTabs";

const MyReads = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Reads</h1>
        <p className="text-muted-foreground text-lg">
          Track your reading journey
        </p>
      </div>
      <ReadingStatusTabs />
    </div>
  );
};

export default MyReads;
