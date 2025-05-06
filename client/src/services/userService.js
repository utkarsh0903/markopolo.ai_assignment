import axios from "axios";

export async function getUsers(page = 1, limit = 50) {
  const response = await axios.get(`https://localhost:5000/api/users?page=${page}&limit=${limit}`);
  return response.data.data || [];
}