import axiosInstance from "@/lib/axiosInstance";

const like = (postId) => axiosInstance.post(`/posts/${postId}/like`);
const unlike = (postId) => axiosInstance.delete(`/posts/${postId}/like`);

export { like, unlike };
