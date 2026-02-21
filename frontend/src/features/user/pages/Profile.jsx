import React from "react";
import ProfileInformationCard from "../components/ProfileInformationCard";
import ProfileTabs from "../components/ProfileTabs";
import useUserProfile from "../hooks/useUserProfile";
import { useParams } from "react-router-dom";
import ProfileInformationCardSkeleton from "../components/ProfileInformationCardSkeleton";
import ErrorProfile from "../components/ErrorProfile";

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
      />
      <ProfileTabs isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default Profile;
