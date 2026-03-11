import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useUpdateUserInfo from "../hooks/useUpdateUserInfo";
import { toast } from "sonner";

const PrivacySettingsCard = ({ isPrivate }) => {
  const { isSubmitting, updateUserInfo } = useUpdateUserInfo();
  const [isChecked, setIsChecked] = useState(isPrivate);

  const handleSwitchToggle = async (check) => {
    setIsChecked(check);
    try {
      await updateUserInfo({ isPrivate: check });
      toast.success("Privacy settings updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Updating privacy settings failed. Please try again", {
        position: "top-center",
      });
      setIsChecked(!check);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Settings
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Public Profile</h4>
            <p className="text-sm text-muted-foreground">
              Allow anyone to follow you
            </p>
          </div>
          <Switch
            checked={isChecked}
            disabled={isSubmitting}
            onCheckedChange={handleSwitchToggle}
          />
        </div>
        {/* <div className="flex items-center justify-between mt-4">
          <div>
            <h4 className="font-medium">Allow Messages</h4>
            <p className="text-sm text-muted-foreground">
              Let other users send you messages
            </p>
          </div>
          <Switch />
        </div> */}
      </CardContent>
    </Card>
  );
};

export default PrivacySettingsCard;
