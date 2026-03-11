import React from "react";
import ProfileSettingsCard from "../components/ProfileSettingsCard";
import PrivacySettingsCard from "../components/PrivacySettingsCard";
import ChangePasswordCard from "../components/ChangePasswordCard";
import DeleteAccountCard from "../components/DeleteAccountCard";
import useUserProfile from "../hooks/useUserProfile";
import ProfileSettingsCardSkeleton from "../components/ProfileSettingsCardSkeleton";
import PrivacySettingsCardSkeleton from "../components/PrivacySettingsCardSkeleton";
import ChangePasswordCardSkeleton from "../components/ChangePasswordCardSkeleton";
import DeleteAccountCardSkeleton from "../components/DeleteAccountCardSkeleton";
import ErrorSettings from "../components/ErrorSettings";

const Settings = () => {
  const { data, isFetching, error, getUser: reFetch } = useUserProfile("me");

  if (!isFetching && error) {
    return <ErrorSettings reFetch={reFetch} />;
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-4xl font-bold text-primary mb-2">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account and preferences
        </p>
      </div>
      {isFetching ? (
        <ProfileSettingsCardSkeleton />
      ) : (
        <ProfileSettingsCard
          fullname={data.fullname}
          username={data.username}
          avatar={data.avatar}
          bio={data.bio}
          favGenres={data.favGenres}
        />
      )}
      {isFetching ? (
        <PrivacySettingsCardSkeleton />
      ) : (
        <PrivacySettingsCard isPrivate={data.isPrivate} />
      )}
      {isFetching ? <ChangePasswordCardSkeleton /> : <ChangePasswordCard />}
      {isFetching ? <DeleteAccountCardSkeleton /> : <DeleteAccountCard />}
    </div>
  );
};

export default Settings;
