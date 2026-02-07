import React from "react";
import PostDetailsCard from "../components/PostDetailsCard";

const AddPost = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Share a Book Moment
        </h1>
        <p className="text-muted-foreground text-lg">
          Finished a great read, discovered a hidden gem, or stuck on a chapter?
          Share your thoughts with fellow BookMates.
        </p>
      </div>
      <PostDetailsCard />
    </div>
  );
};

export default AddPost;
