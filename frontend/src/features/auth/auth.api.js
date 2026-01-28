import axiosInstance from "../../lib/axiosInstance.js";

const login = (loginData) => axiosInstance.post("/login", loginData);

export default login;
