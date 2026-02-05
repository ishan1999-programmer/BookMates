import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const PrivacySettingsCard = () => {
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
              Allow anyone to see your profile and books
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <h4 className="font-medium">Allow Messages</h4>
            <p className="text-sm text-muted-foreground">
              Let other users send you messages
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettingsCard;
