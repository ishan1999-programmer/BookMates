import axiosInstance from "@/lib/axiosInstance";

const getUser = (username) => axiosInstance.get(`/users/${username}`);

const searchUsers = (searchQuery, signal) =>
  axiosInstance.get(`/users/search?q=${searchQuery}`, { signal });

const unfollowUser = (userId) =>
  axiosInstance.delete(`/users/${userId}/follow`);

const followUser = (userId) => axiosInstance.post(`/users/${userId}/follow`);

export { getUser, searchUsers, unfollowUser, followUser };
