import axiosInstance from "../../../lib/axiosInstance.js";

const login = (loginData) => axiosInstance.post("/login", loginData);

const signup = (signupData) => axiosInstance.post("/users", signupData);

export { login, signup };
