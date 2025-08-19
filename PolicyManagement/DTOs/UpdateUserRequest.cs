// DTOs/UpdateUserRequest.cs
namespace PolicyManagement.DTOs;

public class UpdateUserRequest
{
    public int UserId { get; set; }
    public string? Name { get; set; }
    public string? Username { get; set; }
    public string? Roles { get; set; }
   
    public DateTime? RefreshTokenExpiryTime { get; set; }
}