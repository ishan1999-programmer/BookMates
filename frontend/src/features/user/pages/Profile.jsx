import React from "react";
import ProfileInformationCard from "../components/ProfileInformationCard";
import ProfileTabs from "../components/ProfileTabs";

const Profile = () => {
  const isOwnProfile = false;
  return (
    <div className="flex flex-col gap-5">
      <ProfileInformationCard isOwnProfile={isOwnProfile} />
      <ProfileTabs isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default Profile;
