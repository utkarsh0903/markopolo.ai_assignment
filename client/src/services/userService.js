import axios from "axios";

export async function getUsers(page = 1, limit = 50) {
  const response = await axios.get(`https://markopolo-ai-assignment.onrender.com/api/users?page=${page}&limit=${limit}`);
  return response.data.data || [];
}