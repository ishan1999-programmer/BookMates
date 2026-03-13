import axiosInstance from "@/lib/axiosInstance";

const getUser = (username) => axiosInstance.get(`/users/${username}`);

const searchUsers = (searchQuery, signal) =>
  axiosInstance.get(`/users/search?q=${searchQuery}`, { signal });

const unfollowUser = (userId) =>
  axiosInstance.delete(`/users/${userId}/follow`);

const followUser = (userId) => axiosInstance.post(`/users/${userId}/follow`);

const updateUserInfo = (updatedDetails) =>
  axiosInstance.put("/users/me", updatedDetails);

const updateUserPassword = (updatedPasswordDetails) =>
  axiosInstance.put("/users/me/password", updatedPasswordDetails);

const deleteUser = (password) =>
  axiosInstance.delete("/users/me", {
    data: password,
  });
export {
  getUser,
  searchUsers,
  unfollowUser,
  followUser,
  updateUserInfo,
  updateUserPassword,
  deleteUser,
};
