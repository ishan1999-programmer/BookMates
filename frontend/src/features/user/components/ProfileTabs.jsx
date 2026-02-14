import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit3,
  Calendar,
  Camera,
  Users,
  User,
  BookOpen,
  Rss,
} from "lucide-react";
import PostCard from "@/features/post/components/PostCard";
import FollowCard from "@/features/follow/components/FollowCard";
const ProfileTabs = ({ isOwnProfile }) => {
  const followData = [
    {
      fullname: "Ishan Tripathi",
      username: "@mystery_reader",
      isFollow: false,
    },
    {
      fullname: "Karuna Gupta",
      username: "@romance_reader",
      isFollow: true,
    },
    {
      fullname: "Ishan Tripathi",
      username: "@mystery_reader",
      isFollow: false,
    },
    {
      fullname: "Karuna Gupta",
      username: "@romance_reader",
      isFollow: true,
    },
    {
      fullname: "Ishan Tripathi",
      username: "@mystery_reader",
      isFollow: false,
    },
    {
      fullname: "Karuna Gupta",
      username: "@romance_reader",
      isFollow: true,
    },
    {
      fullname: "Ishan Tripathi",
      username: "@mystery_reader",
      isFollow: false,
    },
    {
      fullname: "Karuna Gupta",
      username: "@romance_reader",
      isFollow: true,
    },
    {
      fullname: "Ishan Tripathi",
      username: "@mystery_reader",
      isFollow: false,
    },
    {
      fullname: "Karuna Gupta",
      username: "@romance_reader",
      isFollow: true,
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
        {/* <div className="flex flex-col gap-8 mt-5">
          <PostCard />
          <PostCard />
          <PostCard />
        </div> */}
      </TabsContent>
      <TabsContent value="reads"></TabsContent>
      <TabsContent value="followers">
        <div className="flex gap-4 flex-wrap mt-5">
          {followData.map((follow) => (
            <div className="flex-1">
              <FollowCard
                fullname={follow.fullname}
                username={follow.username}
                isFollow={follow.isFollow}
              />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="followings">
        <div className="flex gap-4 flex-wrap  mt-5">
          {followData.map((follow) => (
            <div className="flex-1">
              <FollowCard
                fullname={follow.fullname}
                username={follow.username}
                isFollow={follow.isFollow}
              />
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
