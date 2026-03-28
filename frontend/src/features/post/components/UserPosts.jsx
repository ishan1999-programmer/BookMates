import React from "react";
import PostCard from "./PostCard";
import useUserPosts from "../hooks/useUserPosts";
import NoPosts from "./NoPosts";
import ErrorPosts from "./ErrorPosts";
import PostCardSkeleton from "./PostCardSkeleton";

const UserPosts = ({ username, isOwnProfile }) => {
  const {
    posts,
    hasMore,
    isFetching,
    fetchNext,
    error,
    toggleLike,
    incrementCommentsCount,
  } = useUserPosts(username);

  if (error && posts.length === 0) {
    return (
      <ErrorPosts
        reFetch={fetchNext}
        username={username}
        description="We couldn’t fetch posts right now. Please try again."
      />
    );
  }

  if (isFetching && posts.length === 0) {
    return (
      <>
        <div className="flex flex-col gap-8 max-w-[1000px]">
          <PostCardSkeleton />
        </div>
      </>
    );
  }

  if (!isFetching && posts.length === 0) {
    return (
      <NoPosts
        title="No posts yet"
        description={
          isOwnProfile
            ? "Share your thoughts on books and start posting"
            : "This user hasn’t shared anything yet"
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-[1000px]">
      {posts?.map((post) => (
        <PostCard
          key={post._id}
          fullname={post.user.fullname}
          username={post.user.username}
          avatar={post.user.avatar}
          bookTitle={post.bookTitle}
          bookAuthor={post.bookAuthor}
          bookGenres={post.bookGenres}
          bookRating={post.bookRating}
          bookCover={post.bookCover}
          bookReview={post.bookReview}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          createdAt={post.createdAt}
          postId={post._id}
          isLikedByMe={post.isLikedByMe}
          toggleLike={toggleLike}
          incrementCommentsCount={incrementCommentsCount}
        />
      ))}
      {isFetching ? (
        <>
          <PostCardSkeleton />
        </>
      ) : error ? (
        <p
          onClick={() => fetchNext(username)}
          className="text-primary text-center cursor-pointer hover:text-primary/80 underline text-sm font-medium"
        >
          Couldn’t load more posts. Tap to retry.
        </p>
      ) : (
        hasMore && (
          <p
            onClick={() => fetchNext(username)}
            className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
          >
            Show more posts
          </p>
        )
      )}
    </div>
  );
};

export default UserPosts;
