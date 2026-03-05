import PostCard from "../components/PostCard";
import usePost from "../hooks/usePost";
import ErrorPost from "../components/ErrorPost";
import PostCardSkeleton from "../components/PostCardSkeleton";
import { useParams } from "react-router-dom";

const Post = () => {
  

  const params = useParams();
  const { postId } = params;
  const {
    data,
    isFetching,
    error,
    fetchPost: reFetch,
    toggleLike,
    incrementCommentsCount,
  } = usePost(postId);

  if (isFetching) {
    return <PostCardSkeleton />;
  }

  if (error) {
    return (
      <ErrorPost errorStatus={error.status} reFetch={reFetch} postId={postId} />
    );
  }

  return (
    <div className="max-w-[1000px]">
      <PostCard
        fullname={data.user.fullname}
        username={data.user.username}
        avatar={data.user.avatar}
        bookTitle={data.bookTitle}
        bookAuthor={data.bookAuthor}
        bookGenres={data.bookGenres}
        bookRating={data.bookRating}
        bookImage={data.bookImage}
        bookReview={data.bookReview}
        likesCount={data.likesCount}
        commentsCount={data.commentsCount}
        createdAt={data.createdAt}
        postId={data._id}
        isLikedByMe={data.isLikedByMe}
        toggleLike={toggleLike}
        incrementCommentsCount={incrementCommentsCount}
      />
    </div>
  );
};

export default Post;
