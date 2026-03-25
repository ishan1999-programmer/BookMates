import axiosInstance from "@/lib/axiosInstance";

const getReads = (username) => axiosInstance.get(`/users/${username}/reads`);

const updateBook = (readId, updatedDetails) =>
  axiosInstance.put(`/reads/${readId}`, updatedDetails);

const addBook = (bookDetails) => axiosInstance.post("/reads", bookDetails);

const removeBook = (bookId) => axiosInstance.delete(`/reads/${bookId}`);

export { getReads, updateBook, addBook, removeBook };
