import ReadingStatusTabs from "../components/ReadingStatusTabs";
import ReadingStatusTabsSkeleton from "../components/ReadingStatusTabsSkeleton";
import ErrorUserReadings from "../components/ErrorUserReadings";
import useUserReads from "../hooks/useUserReads";
const MyReads = () => {
  const username = localStorage.getItem("username");
  const { data, error, isFetching, getUserReads, updateCurrentPage } =
    useUserReads(username);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Reads</h1>
        <p className="text-muted-foreground text-lg">
          Track your reading journey
        </p>
      </div>
      {isFetching ? (
        <ReadingStatusTabsSkeleton />
      ) : error ? (
        <ErrorUserReadings username={username} reFetch={getUserReads} />
      ) : (
        <ReadingStatusTabs
          data={data}
          isOwnProfile={true}
          updateCurrentPage={updateCurrentPage}
        />
      )}
    </div>
  );
};

export default MyReads;
