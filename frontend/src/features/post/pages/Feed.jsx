import React from "react";
import PostCard from "../components/PostCard";

const Feed = () => {
  return (
    <div className="flex flex-col gap-8">
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default Feed;
