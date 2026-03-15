import FollowCard from "./FollowCard";
import FollowCardSkeleton from "./FollowCardSkeleton";
import useUserFollowers from "../hooks/useUserFollowers";
import NoFollowersFollowings from "./NoFollowersFollowings";
import ErrorFollowersFollowings from "./ErrorFollowersFollowings";

const UserFollowers = ({ username, isOwnProfile }) => {
  const {
    data,
    isFetching,
    fetchUserFollowers,
    error,
    submittingIds,
    sendFollowRequest,
    cancelFollowRequest,
    followUser,
    unfollowUser,
  } = useUserFollowers(username);

  if (isFetching) {
    return (
      <>
        <div className="flex flex-col gap-4 max-w-[1000px]">
          <FollowCardSkeleton />
          <FollowCardSkeleton />
          <FollowCardSkeleton />
        </div>
      </>
    );
  }

  if (!isFetching && error) {
    return (
      <ErrorFollowersFollowings
        reFetch={fetchUserFollowers}
        username={username}
        description="We couldn’t fetch followers right now. Please try again."
      />
    );
  }

  if (!isFetching && data.length === 0) {
    return (
      <NoFollowersFollowings
        title="No followers yet"
        description={
          isOwnProfile
            ? "When people follow you, they'll appear here"
            : "When people follow this user, they’ll appear here"
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-[1000px]">
      {data.map((user) => (
        <FollowCard
          key={user._id}
          user={user}
          submittingIds={submittingIds}
          sendFollowRequest={sendFollowRequest}
          cancelFollowRequest={cancelFollowRequest}
          followUser={followUser}
          unfollowUser={unfollowUser}
        />
      ))}
    </div>
  );
};

export default UserFollowers;
