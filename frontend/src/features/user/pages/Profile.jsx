import React from "react";
import ProfileInformationCard from "../components/ProfileInformationCard";
import ProfileTabs from "../components/ProfileTabs";
import useUserProfile from "../hooks/useUserProfile";
import { useParams } from "react-router-dom";
import ProfileInformationCardSkeleton from "../components/ProfileInformationCardSkeleton";
import ErrorProfile from "../components/ErrorProfile";
import useSendRequest from "@/features/follow/hooks/useSendRequest";
import useUnfollowUser from "../hooks/useUnfollowUser";
import useFollowUser from "../hooks/useFollowUser";
import useCancelFollowRequest from "@/features/follow/hooks/useCancelFollowRequest";

const Profile = () => {
  const params = useParams();
  const { username } = params;
  const myUsername = localStorage.getItem("username");
  const isOwnProfile = !username || username === myUsername;
  const {
    data,
    isFetching,
    error,
    getUser: reFetch,
  } = useUserProfile(isOwnProfile ? myUsername : username);
  const { isSubmitting: isSendingFollowRequest, sendFollowRequest } =
    useSendRequest();
  const { isSubmitting: isCancelingFollowRequest, cancelFollowRequest } =
    useCancelFollowRequest();
  const { isSubmitting: isUnfollowing, unfollowUser } = useUnfollowUser();
  const { isSubmitting: isFollowing, followUser } = useFollowUser();

  if (isFetching) {
    return <ProfileInformationCardSkeleton />;
  }

  if (!isFetching && error) {
    return <ErrorProfile errorStatus={error.status} reFetch={reFetch} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <ProfileInformationCard
        fullname={data?.fullname}
        username={data?.username}
        avatar={data?.avatar}
        bio={data?.bio}
        followersCount={data?.followersCount}
        followingsCount={data?.followingsCount}
        booksReadCount={data?.booksReadCount}
        favGenres={data?.favGenres}
        createdAt={data?.createdAt}
        isOwnProfile={isOwnProfile}
        isSendingFollowRequest={isSendingFollowRequest}
        sendFollowRequest={sendFollowRequest}
        isCancelingFollowRequest={isCancelingFollowRequest}
        cancelFollowRequest={cancelFollowRequest}
        userId={data._id}
        isFollowedByMe={data.isFollowedByMe}
        isUnfollowing={isUnfollowing}
        unfollowUser={unfollowUser}
        isFollowing={isFollowing}
        followUser={followUser}
        isPrivate={data.isPrivate}
        isFollowRequestSent={data.isFollowRequestSent}
        followRequestId={data.followRequestId}
      />
      <ProfileTabs isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default Profile;
