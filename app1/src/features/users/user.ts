export interface User {
    userId: string;         // ✅ matches backend DTO
    name: string;
    username: string;
    roles: string[];
    permissions: string[];
    status?: string;        // optional if backend doesn’t always send it
  }