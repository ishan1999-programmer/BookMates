import FollowCard from "./FollowCard";
import FollowCardSkeleton from "./FollowCardSkeleton";
import useUserFollowers from "../hooks/useFollowers";
import NoFollowersFollowings from "./NoFollowersFollowings";
import ErrorFollowersFollowings from "./ErrorFollowersFollowings";

const UserFollowers = ({ username }) => {
  const { data, isFetching, fetchUserFollowers, error } =
    useUserFollowers(username);

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
        title="No Followers"
        description="User has no followers yet"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-[1000px]">
      {data?.map((d) => (
        <FollowCard
          key={d._id}
          fullname={d.fullname}
          username={d.username}
          avatar={d.avatar}
          isFollowedByMe={d.isFollowedByMe}
          isFollowRequestSent={d.isFollowRequestSent}
        />
      ))}
    </div>
  );
};

export default UserFollowers;
