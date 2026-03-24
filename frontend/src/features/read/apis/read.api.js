import axiosInstance from "@/lib/axiosInstance";

const getReads = (username) => axiosInstance.get(`/users/${username}/reads`);

const updateBookStatus = (bookId, updateDeatils) =>
  axiosInstance.put(`/reads/${bookId}`, updateDeatils);

const addBook = (bookDetails) => axiosInstance.post("/reads", bookDetails);

const removeBook = (bookId) => axiosInstance.delete(`/reads/${bookId}`);

export { getReads, updateBookStatus, addBook,removeBook };
