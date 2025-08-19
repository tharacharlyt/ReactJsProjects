// Services/IUserService.cs
using PolicyManagement.DTOs;
using PolicyManagement.Models;

namespace PolicyManagement.Services;

public interface IUserService
{
    Task<User?> AuthenticateAsync(string username, string password);
    List<User> GetAllUsers();
    // Change the return type to Task to match the async implementation
    Task AddUser(User user); 
    // Add the new methods
    Task UpdateUser(UpdateUserRequest user);
    Task<User?> GetByRefreshTokenAsync(string refreshToken);
}