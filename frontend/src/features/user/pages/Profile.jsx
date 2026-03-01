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
    userData,
    isFetching,
    error,
    getUser: reFetch,
  } = useUserProfile(username || myUsername);
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
        fullname={userData?.fullname}
        username={userData?.username}
        avatar={userData?.avatar}
        bio={userData?.bio}
        followersCount={userData?.followersCount}
        followingsCount={userData?.followingsCount}
        booksReadCount={userData?.booksReadCount}
        favGenres={[]}
        createdAt={userData?.createdAt}
        isOwnProfile={isOwnProfile}
        isSendingFollowRequest={isSendingFollowRequest}
        sendFollowRequest={sendFollowRequest}
        isCancelingFollowRequest={isCancelingFollowRequest}
        cancelFollowRequest={cancelFollowRequest}
        userId={userData._id}
        isFollowedByMe={userData.isFollowedByMe}
        isUnfollowing={isUnfollowing}
        unfollowUser={unfollowUser}
        isFollowing={isFollowing}
        followUser={followUser}
        isPrivate={userData.isPrivate}
        isFollowRequestSent={userData.isFollowRequestSent}
        followRequestId={userData.followRequestId}
      />
      <ProfileTabs isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default Profile;
