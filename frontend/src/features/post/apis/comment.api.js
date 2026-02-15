import axiosInstance from "@/lib/axiosInstance";

const createComment = (postId, commentDetails) =>
  axiosInstance.post(`/posts/${postId}/comments`, commentDetails);

const getComments = (postId, cursor) => {

  if (cursor) {
    const { createdAt, _id } = cursor;
    return axiosInstance.get(
      `posts/${postId}/comments?createdAt=${createdAt}&_id=${_id}`,
    );
  } else {
    return axiosInstance.get(`posts/${postId}/comments`);
  }
};

export { createComment, getComments };
