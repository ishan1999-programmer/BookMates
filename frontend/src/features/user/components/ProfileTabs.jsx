import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, BookOpen, Rss } from "lucide-react";
import FollowCard from "@/features/follow/components/FollowCard";
import UserPosts from "@/features/post/components/UserPosts";
import UserFollowers from "@/features/follow/components/UserFollowers";
import UserFollowings from "@/features/follow/components/UserFollowings";

const ProfileTabs = ({ isOwnProfile, username }) => {
  const followData = [
    {
      fullname: "Ishan Tripathi",
      username: "@mystery_reader",
      isFollow: false,
    },
  ];
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
        <UserPosts username={username} />
      </TabsContent>
      <TabsContent value="reads"></TabsContent>
      <TabsContent value="followers">
        <UserFollowers username={username} />
      </TabsContent>
      <TabsContent value="followings">
        <UserFollowings username={username} isOwnProfile={isOwnProfile} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
