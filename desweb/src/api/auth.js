import axios from "axios";

const AUTH_URL = "http://localhost:5000/api/auth";


export const login = (credentials) => axios.post(`${AUTH_URL}/login`, credentials);
export const register = (data) => axios.post(`${AUTH_URL}/register`, data);
export const verifyToken = (token) => axios.get(`${AUTH_URL}/verify`, {
  headers: { Authorization: `Bearer ${token}` }
});