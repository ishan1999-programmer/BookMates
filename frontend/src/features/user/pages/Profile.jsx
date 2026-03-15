import React from "react";
import ProfileInformationCard from "../components/ProfileInformationCard";
import ProfileTabs from "../components/ProfileTabs";
import useUserProfile from "../hooks/useUserProfile";
import { useParams } from "react-router-dom";
import ProfileInformationCardSkeleton from "../components/ProfileInformationCardSkeleton";
import ErrorProfile from "../components/ErrorProfile";

const Profile = () => {
  const { username } = useParams();
  const myUsername = localStorage.getItem("username");
  const isOwnProfile = !username || username === myUsername;
  const {
    data,
    isFetching,
    error,
    getUser: reFetch,
    isSubmitting,
    sendFollowRequest,
    cancelFollowRequest,
    followUser,
    unfollowUser,
  } = useUserProfile(isOwnProfile ? myUsername : username);

  if (isFetching) {
    return <ProfileInformationCardSkeleton />;
  }

  if (!isFetching && error) {
    return <ErrorProfile errorStatus={error.status} reFetch={reFetch} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <ProfileInformationCard
        user={data}
        isOwnProfile={isOwnProfile}
        sendFollowRequest={sendFollowRequest}
        cancelFollowRequest={cancelFollowRequest}
        unfollowUser={unfollowUser}
        followUser={followUser}
        isSubmitting={isSubmitting}
      />
      <ProfileTabs
        isOwnProfile={isOwnProfile}
        username={isOwnProfile ? myUsername : username}
      />
    </div>
  );
};

export default Profile;
