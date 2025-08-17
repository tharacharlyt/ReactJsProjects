import axios from "axios";
import { User } from "./user";

const API_URL = "http://localhost:5138/api/User";

export async function getUserById(id: string): Promise<User> {
  const res = await axios.get<User>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4IiwibmFtZSI6IkRvcmEiLCJ1c2VybmFtZSI6IkRvcmEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsInBlcm1pc3Npb24iOlsiUG9saWN5LkFkZCIsIlBvbGljeS5FZGl0IiwiUG9saWN5LkRlbGV0ZSIsIlBvbGljeS5MaXN0IiwiRG9jdW1lbnQuQWRkIiwiRG9jdW1lbnQuTGlzdCJdLCJleHAiOjE3NTU0NTYxMjAsImlzcyI6Im15LWFwaSIsImF1ZCI6Im15LWNsaWVudCJ9.OEIzGWlTvu7gBP0Ul2XLYVXPgA8zUhr5DYVsTKhzx08`, // replace with real token
    },
  });
  return res.data;
}

export async function updateUser(id: string, data: Partial<User>) {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4IiwibmFtZSI6IkRvcmEiLCJ1c2VybmFtZSI6IkRvcmEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsInBlcm1pc3Npb24iOlsiUG9saWN5LkFkZCIsIlBvbGljeS5FZGl0IiwiUG9saWN5LkRlbGV0ZSIsIlBvbGljeS5MaXN0IiwiRG9jdW1lbnQuQWRkIiwiRG9jdW1lbnQuTGlzdCJdLCJleHAiOjE3NTU0NTYxMjAsImlzcyI6Im15LWFwaSIsImF1ZCI6Im15LWNsaWVudCJ9.OEIzGWlTvu7gBP0Ul2XLYVXPgA8zUhr5DYVsTKhzx08`,
    },
  });
  return res.data;
}