import axiosInstance from "@/lib/axiosInstance";

const createPost = (postData) => axiosInstance.post("/posts", postData);
const getFeed = (cursor) => {
  if (!cursor) {
    return axiosInstance.get(`/users/me/feed`);
  } else {
    const { createdAt, _id } = cursor;
    return axiosInstance.get(
      `/users/me/feed?createdAt=${createdAt}&_id=${_id}`,
    );
  }
};

export { createPost, getFeed };
