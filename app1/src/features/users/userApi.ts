import axios from "axios";
import { User } from "./user";

const API_URL = "http://localhost:5138/api/User";

export async function getUserById(id: string): Promise<User> {
  const res = await axios.get<User>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMyIsIm5hbWUiOiJzbWl0aDExIiwidXNlcm5hbWUiOiJzbWl0aDExIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJwZXJtaXNzaW9uIjpbIlBvbGljeS5BZGQiLCJQb2xpY3kuRWRpdCIsIlBvbGljeS5EZWxldGUiLCJQb2xpY3kuTGlzdCIsIkRvY3VtZW50LkFkZCIsIkRvY3VtZW50Lkxpc3QiXSwiZXhwIjoxNzU2MTM4MTAzLCJpc3MiOiJteS1hcGkiLCJhdWQiOiJteS1jbGllbnQifQ.4oYJ8MwEcP3_BMwR6fojX_yx_u7TxLChtYWgLs5WBvE`
    },
  });
  return res.data;
}

export async function updateUser(id: string, data: Partial<User>) {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMyIsIm5hbWUiOiJzbWl0aDExIiwidXNlcm5hbWUiOiJzbWl0aDExIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJwZXJtaXNzaW9uIjpbIlBvbGljeS5BZGQiLCJQb2xpY3kuRWRpdCIsIlBvbGljeS5EZWxldGUiLCJQb2xpY3kuTGlzdCIsIkRvY3VtZW50LkFkZCIsIkRvY3VtZW50Lkxpc3QiXSwiZXhwIjoxNzU2MTM4MTAzLCJpc3MiOiJteS1hcGkiLCJhdWQiOiJteS1jbGllbnQifQ.4oYJ8MwEcP3_BMwR6fojX_yx_u7TxLChtYWgLs5WBvE`
    },
  });
  return res.data;
}