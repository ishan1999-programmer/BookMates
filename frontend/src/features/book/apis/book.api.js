import axiosInstance from "@/lib/axiosInstance";

const searchBooks = (searchQuery, signal) =>
  axiosInstance.get(`/books/search?q=${searchQuery}`, { signal });

export { searchBooks };
