import axios from "axios";
import { User } from "./user";

const API_URL = "http://localhost:5138/api/User";

export async function getUserById(id: string): Promise<User> {
  const res = await axios.get<User>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsIm5hbWUiOiJBbGxlbjExIiwidXNlcm5hbWUiOiJBbGxlbjExIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJwZXJtaXNzaW9uIjpbIlBvbGljeS5BZGQiLCJQb2xpY3kuRWRpdCIsIlBvbGljeS5EZWxldGUiLCJQb2xpY3kuTGlzdCIsIkRvY3VtZW50LkFkZCIsIkRvY3VtZW50Lkxpc3QiXSwiZXhwIjoxNzU1NjM1MDcwLCJpc3MiOiJteS1hcGkiLCJhdWQiOiJteS1jbGllbnQifQ.YdvwKhTiN5GMQ49s1B3Aa2bERsac-ZK_P628LO1OR7o`
    },
  });
  return res.data;
}

export async function updateUser(id: string, data: Partial<User>) {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsIm5hbWUiOiJBbGxlbjExIiwidXNlcm5hbWUiOiJBbGxlbjExIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJwZXJtaXNzaW9uIjpbIlBvbGljeS5BZGQiLCJQb2xpY3kuRWRpdCIsIlBvbGljeS5EZWxldGUiLCJQb2xpY3kuTGlzdCIsIkRvY3VtZW50LkFkZCIsIkRvY3VtZW50Lkxpc3QiXSwiZXhwIjoxNzU1NjM1MDcwLCJpc3MiOiJteS1hcGkiLCJhdWQiOiJteS1jbGllbnQifQ.YdvwKhTiN5GMQ49s1B3Aa2bERsac-ZK_P628LO1OR7o`
    },
  });
  return res.data;
}