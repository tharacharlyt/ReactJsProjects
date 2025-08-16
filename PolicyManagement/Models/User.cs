// Models/User.cs
using System.ComponentModel.DataAnnotations.Schema;

namespace PolicyManagement.Models;

public class User
{
    public int UserId { get; set; }
    public string Name { get; set; } = "";
    public string Username { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string Roles { get; set; } = "";
    public string Permissions { get; set; } = "";
    public string RefreshToken { get; set; } = "";
    public DateTime RefreshTokenExpiryTime { get; set; }

    [NotMapped]
    public List<string> RolesList
    {
        get => Roles?.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() ?? new List<string>();
        set => Roles = string.Join(",", value);
    }

    [NotMapped]
    public List<string> PermissionsList
    {
        get => Permissions?.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() ?? new List<string>();
        set => Permissions = string.Join(",", value);
    }
} 