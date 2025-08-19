// Services/PostgresUserService.cs
using Microsoft.EntityFrameworkCore;
using PolicyManagement.Models;
using PolicyManagement.Data;
using BCrypt.Net;
using System.Security.Claims;
using PolicyManagement.DTOs;
using System.ComponentModel;

namespace PolicyManagement.Services;

public class PostgresUserService : IUserService
{
    private readonly PolicyManagementDbContext _context;

    private static readonly Dictionary<string, List<string>> RolePermissions = new()
    {
        ["Admin"] = new()
        {
            "Policy.Add", "Policy.Edit", "Policy.Delete", "Policy.List",
            "Document.Add", "Document.List"
        },
        ["Manager"] = new()
        {
            "Policy.Add", "Policy.Edit", "Policy.List", "Document.List"
        },
        ["Editor"] = new()
        {
            "Policy.Edit", "Document.List"
        },
        ["Viewer"] = new()
        {
            "Document.List"
        }
    };

    public PostgresUserService(PolicyManagementDbContext context)
    {
        _context = context;
    }

    public async Task<User?> AuthenticateAsync(string username, string password)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            return null;
        }
        return user;
    }

    public List<User> GetAllUsers()
    {
        return _context.Users.ToList();
    }

    public async Task AddUser(User user)
    {
        if (await _context.Users.AnyAsync(u => u.Username.ToLower() == user.Username.ToLower()))
        {
            throw new Exception("Username already exists.");
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        
        user.PermissionsList = user.RolesList
            .Where(r => RolePermissions.ContainsKey(r))
            .SelectMany(r => RolePermissions[r])
            .Distinct()
            .ToList();

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
    
    public async Task UpdateUser(UpdateUserRequest user)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserId == user.UserId);
    if (existingUser == null)
    {
        throw new Exception("User not found.");
    }

    existingUser.Name = user.Name;
    existingUser.Username = user.Username;
    existingUser.Roles = user.Roles;

    // Recalculate permissions from roles
    existingUser.PermissionsList = existingUser.RolesList
        .Where(r => RolePermissions.ContainsKey(r))
        .SelectMany(r => RolePermissions[r])
        .Distinct()
        .ToList();
        await _context.SaveChangesAsync();
    }
    
    public async Task<User?> GetByRefreshTokenAsync(string refreshToken)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
    }
}