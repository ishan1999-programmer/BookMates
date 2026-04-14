import axiosInstance from "../../../lib/axiosInstance.js";

const login = (loginData) => axiosInstance.post("/auth/login", loginData);

const signup = (signupData) => axiosInstance.post("/users", signupData);

export { login, signup };
