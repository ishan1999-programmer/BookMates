import CommentCard from "./CommentCard";
import CommentCardSkeleton from "./CommentCardSkeleton";
import NoComments from "./NoComments";
import ErrorComments from "./ErrorComments";

const CommentList = ({ comments, isFetching, error, hasMore, fetchNext }) => {
  if (error && comments.length === 0) {
    return <ErrorComments fetchNext={fetchNext} />;
  }

  if (isFetching && comments.length === 0) {
    return (
      <div className="flex flex-col gap-5 mt-5">
        <CommentCardSkeleton />
        <CommentCardSkeleton />
        <CommentCardSkeleton />
      </div>
    );
  }

  if (!isFetching && comments.length === 0) {
    return <NoComments />;
  }

  return (
    <div className="flex flex-col gap-5 mt-5">
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          fullname={comment.user.fullname}
          createdAt={comment.createdAt}
          avatar={comment.user.avatar}
          text={comment.text}
        />
      ))}
      {isFetching ? (
        <>
          <CommentCardSkeleton />
          <CommentCardSkeleton />
        </>
      ) : error ? (
        <p
          onClick={() => fetchNext()}
          className="text-primary text-center cursor-pointer hover:text-primary/80 underline text-sm font-medium"
        >
          Couldn’t load more comments. Tap to retry.
        </p>
      ) : (
        hasMore && (
          <p
            onClick={() => fetchNext()}
            className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
          >
            View more comments
          </p>
        )
      )}
    </div>
  );
};

export default CommentList;
