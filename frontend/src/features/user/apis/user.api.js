import axiosInstance from "@/lib/axiosInstance";

const getUser = (username) => axiosInstance.get(`/users/${username}`);

const searchUsers = (searchQuery, signal) =>
  axiosInstance.get(`/users/search?q=${searchQuery}`, { signal });
export { getUser, searchUsers };
