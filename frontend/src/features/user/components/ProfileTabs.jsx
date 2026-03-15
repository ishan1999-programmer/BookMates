import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, BookOpen, Rss } from "lucide-react";
import FollowCard from "@/features/follow/components/FollowCard";
import UserPosts from "@/features/post/components/UserPosts";
import UserFollowers from "@/features/follow/components/UserFollowers";
import UserFollowings from "@/features/follow/components/UserFollowings";
import PrivateProfile from "./PrivateProfile";

const ProfileTabs = ({ user, isOwnProfile, username }) => {
  const { isFollowedByMe, isPrivate } = user;
  const isVisible = isOwnProfile || !isPrivate || isFollowedByMe;
  return (
    <Tabs defaultValue="posts">
      <TabsList className="flex">
        <TabsTrigger className="flex-1 flex gap-2 items-center" value="posts">
          <Rss className="h-4 w-4" /> Posts
        </TabsTrigger>
        {!isOwnProfile && (
          <TabsTrigger className="flex-1 flex gap-2 items-center" value="reads">
            <BookOpen className="h-4 w-4" /> Reads
          </TabsTrigger>
        )}
        <TabsTrigger
          className="flex-1 flex gap-2 items-center"
          value="followers"
        >
          <Users className="h-4 w-4" /> Followers
        </TabsTrigger>
        <TabsTrigger
          className="flex-1 flex gap-2 items-center"
          value="followings"
        >
          <User className="h-4 w-4" /> Followings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        {isVisible ? (
          <UserPosts username={username} isOwnProfile={isOwnProfile} />
        ) : (
          <PrivateProfile description="Follow this user to see their posts" />
        )}
      </TabsContent>
      <TabsContent value="reads">
        {isVisible ? (
          <div>Feature coming soon......</div>
        ) : (
          <PrivateProfile description="Follow this user to see their reading activity." />
        )}
      </TabsContent>
      <TabsContent value="followers">
        {isVisible ? (
          <UserFollowers username={username} isOwnProfile={isOwnProfile} />
        ) : (
          <PrivateProfile description="Follow this user to see their followers" />
        )}
      </TabsContent>
      <TabsContent value="followings">
        {isVisible ? (
          <UserFollowings username={username} isOwnProfile={isOwnProfile} />
        ) : (
          <PrivateProfile description="Follow this user to see who they follow" />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
