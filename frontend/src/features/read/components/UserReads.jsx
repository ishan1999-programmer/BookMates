import React from "react";
import ReadingStatusTabs from "./ReadingStatusTabs";
import ReadingStatusTabsSkeleton from "./ReadingStatusTabsSkeleton";
import ErrorUserReadings from "./ErrorUserReadings";
import useUserReads from "../hooks/useUserReads";

const UserReads = ({ username, isOwnProfile }) => {
  const { data, error, isFetching, getUserReads } = useUserReads(username);

  if (isFetching) {
    return <ReadingStatusTabsSkeleton />;
  }

  if (error) {
    return <ErrorUserReadings username={username} reFetch={getUserReads} />;
  }

  return (
    <ReadingStatusTabs
      data={data}
      isOwnProfile={isOwnProfile}
    />
  );
};

export default UserReads;
