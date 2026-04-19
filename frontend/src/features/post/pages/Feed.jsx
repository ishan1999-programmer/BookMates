import React from "react";
import PostCard from "../components/PostCard";
import useFeed from "../hooks/useFeed";
import NoPosts from "../components/NoPosts";
import ErrorPosts from "../components/ErrorPosts";
import PostCardSkeleton from "../components/PostCardSkeleton";

const Feed = () => {
  const {
    posts,
    hasMore,
    isFetching,
    fetchNext,
    error,
    toggleLike,
    incrementCommentsCount,
  } = useFeed();

  if (error && posts.length === 0) {
    return (
      <ErrorPosts
        reFetch={fetchNext}
        description="We couldn’t fetch your feed right now. Please try again"
      />
    );
  }

  if (isFetching) {
    return (
      <>
        <div className="flex flex-col gap-8 max-w-[1000px]">
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </>
    );
  }

  if (!isFetching && posts.length === 0) {
    return (
      <NoPosts
        title="No Posts yet"
        description="Follow people to see their posts"
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
          <PostCardSkeleton />
        </>
      ) : error ? (
        <p
          onClick={() => fetchNext()}
          className="text-primary text-center cursor-pointer hover:text-primary/80 underline text-sm font-medium"
        >
          Couldn’t load more posts. Tap to retry.
        </p>
      ) : (
        hasMore && (
          <p
            onClick={() => fetchNext()}
            className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
          >
            Show more posts
          </p>
        )
      )}
    </div>
  );
};

export default Feed;
