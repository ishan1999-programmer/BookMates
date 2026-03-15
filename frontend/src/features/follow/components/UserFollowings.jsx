import FollowCard from "./FollowCard";
import FollowCardSkeleton from "./FollowCardSkeleton";
import useUserFollowings from "../hooks/useUserFollowings";
import NoFollowersFollowings from "./NoFollowersFollowings";
import ErrorFollowersFollowings from "./ErrorFollowersFollowings";

const UserFollowings = ({ username, isOwnProfile }) => {
  const {
    data,
    isFetching,
    fetchUserFollowings,
    error,
    submittingIds,
    sendFollowRequest,
    cancelFollowRequest,
    followUser,
    unfollowUser,
  } = useUserFollowings(username);

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
        reFetch={fetchUserFollowings}
        username={username}
        description="We couldn’t fetch followings right now. Please try again."
      />
    );
  }

  if (!isFetching && data.length === 0) {
    return (
      <NoFollowersFollowings
        title={
          isOwnProfile ? "You're not following anyone" : "Not following anyone"
        }
        description={
          isOwnProfile
            ? "Follow people to see their posts in your feed"
            : "Accounts this user follows will appear here"
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
          isOwnProfile={isOwnProfile}
        />
      ))}
    </div>
  );
};

export default UserFollowings;
