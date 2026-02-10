import axiosInstance from "@/lib/axiosInstance";

const createPost = (postData) => axiosInstance.post("/posts", postData);

export { createPost };
