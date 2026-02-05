import React from "react";
import ProfileInfoCard from "../components/ProfileInfoCard";
import PrivacySettingsCard from "../components/PrivacySettingsCard";
import ChangePasswordCard from "../components/ChangePasswordCard";
import DeleteAccountCard from "../components/DeleteAccountCard";

const Settings = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-4xl font-bold text-primary mb-2">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account and preferences
        </p>
      </div>
      <ProfileInfoCard />
      <PrivacySettingsCard />
      <ChangePasswordCard />
      <DeleteAccountCard />
    </div>
  );
};

export default Settings;
