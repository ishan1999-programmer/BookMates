import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, BookOpen, Rss } from "lucide-react";
import FollowCard from "@/features/follow/components/FollowCard";
import UserPosts from "@/features/post/components/UserPosts";
import UserReads from "@/features/read/components/UserReads";
import UserFollowers from "@/features/follow/components/UserFollowers";
import UserFollowings from "@/features/follow/components/UserFollowings";
import PrivateProfile from "./PrivateProfile";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfileTabs = ({ user, isOwnProfile, username }) => {
  const { isFollowedByMe, isPrivate } = user;
  const isVisible = isOwnProfile || !isPrivate || isFollowedByMe;
  const isMobile = useIsMobile();
  return (
    <Tabs defaultValue="posts">
      <TabsList className="flex">
        <TabsTrigger className="flex-1 flex gap-1 items-center" value="posts">
          <Rss className={isMobile ? "h-3 w-3" : "h-4 w-4"} />{" "}
          <span className={isMobile ? "text-[10px]" : "text-[14px]"}>
            Posts
          </span>
        </TabsTrigger>
        {!isOwnProfile && (
          <TabsTrigger className="flex-1 flex gap-1 items-center" value="reads">
            <BookOpen className={isMobile ? "h-3 w-3" : "h-4 w-4"} />{" "}
            <span className={isMobile ? "text-[10px]" : "text-[14px]"}>Reads</span>
          </TabsTrigger>
        )}
        <TabsTrigger
          className="flex-1 flex gap-1 items-center"
          value="followers"
        >
          <Users className={isMobile ? "h-3 w-3" : "h-4 w-4"} />{" "}
          <span className={isMobile ? "text-[10px]" : "text-[14px]"}>Followers</span>
        </TabsTrigger>
        <TabsTrigger
          className="flex-1 flex gap-1 items-center"
          value="followings"
        >
          <User className={isMobile ? "h-3 w-3" : "h-4 w-4"} />{" "}
          <span className={isMobile ? "text-[10px]" : "text-[14px]"}>Followings</span>
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
          <UserReads username={username} isOwnProfile={isOwnProfile} />
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
