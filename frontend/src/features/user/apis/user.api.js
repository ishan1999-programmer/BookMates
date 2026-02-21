import axiosInstance from "@/lib/axiosInstance";

const getUser = (username) => axiosInstance.get(`/users/${username}`);
export {getUser}