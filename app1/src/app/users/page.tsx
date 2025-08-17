import { User } from "@/features/users/user";
import axios from "axios";
export const dynamic = 'force-dynamic';
async function getUsers(): Promise<User[]> {
    try {
      const res = await axios.get<User[]>(`http://localhost:5138/api/User`, {
        headers: {
          Authorization:  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4IiwibmFtZSI6IkRvcmEiLCJ1c2VybmFtZSI6IkRvcmEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsInBlcm1pc3Npb24iOlsiUG9saWN5LkFkZCIsIlBvbGljeS5FZGl0IiwiUG9saWN5LkRlbGV0ZSIsIlBvbGljeS5MaXN0IiwiRG9jdW1lbnQuQWRkIiwiRG9jdW1lbnQuTGlzdCJdLCJleHAiOjE3NTU0NTYxMjAsImlzcyI6Im15LWFwaSIsImF1ZCI6Im15LWNsaWVudCJ9.OEIzGWlTvu7gBP0Ul2XLYVXPgA8zUhr5DYVsTKhzx08`}
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
        <thead className="bg-green-900">
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
