import { User } from "@/features/users/user";
import axios from "axios";
export const dynamic = 'force-dynamic';
async function getUsers(): Promise<User[]> {
    try {
      const res = await axios.get<User[]>(`http://localhost:5138/api/User`, {
        headers: {
          Authorization:  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwibmFtZSI6IlRoYXJhIiwidXNlcm5hbWUiOiJUaGFyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwicGVybWlzc2lvbiI6WyJQb2xpY3kuQWRkIiwiUG9saWN5LkVkaXQiLCJQb2xpY3kuRGVsZXRlIiwiUG9saWN5Lkxpc3QiLCJEb2N1bWVudC5BZGQiLCJEb2N1bWVudC5MaXN0Il0sImV4cCI6MTc1NTMyNDQ1NiwiaXNzIjoibXktYXBpIiwiYXVkIjoibXktY2xpZW50In0.XHVraz8csQgfyMXNoL-6SDjmwj4gCEgjasKQk7PDWu0`
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

export default async function UsersPage() 
{
    const users = await getUsers();
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Username</th>
            <th className="border px-4 py-2 text-left">Roles</th>
          </tr>

        </thead>
        <tbody>
        {users.map(u => (
            <tr>
              <td className="border px-4 py-2">{u.userId.toString()}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.username}</td>
              <td className="border px-4 py-2">{u.roles}</td>
            </tr>
      ))}
         {
            users.length === 0 && 
            <tr>
              <td className="px-4 py-8 text-center text-gray-500" colSpan={4}>
                No users found
              </td>
            </tr>
         }
            
       
        </tbody>

      </table>
    </main>
  );
  
}
