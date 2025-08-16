// Controller/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using PolicyManagement.Models;
using PolicyManagement.Services;
using PolicyManagement.Helpers;
using PolicyManagement.Models.DTOs; // Assuming your DTOs are here
using PolicyManagement.DTOs;

namespace PolicyManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _config;

    public AuthController(IUserService userService, IConfiguration config)
    {
        _userService = userService;
        _config = config;
    }

    // ------------------- REGISTER -------------------
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var user = new User
        {
            Name = request.Name,
            Username = request.Username,
            PasswordHash = request.Password, // Will be hashed in service
            // Use the NotMapped properties which work with lists
            RolesList = request.Roles.ToList(),
            RefreshToken = string.Empty,
            RefreshTokenExpiryTime = DateTime.MinValue
        };

        try
        {
            await _userService.AddUser(user);
            return Ok(new { message = "✅ User registered successfully", username = user.Username });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // ------------------- LOGIN -------------------
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        Console.WriteLine($"Login attempt for user: {request.Username}");
        Console.WriteLine($"Password: {request.Password}");
        var user = await _userService.AuthenticateAsync(request.Username, request.Password);
        if (user == null)
            return Unauthorized("❌ Invalid username or password");

        var token = TokenHelper.GenerateJwtToken(user, _config);
        var refreshToken = TokenHelper.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _userService.UpdateUser(user); // Add this method to your IUserService/PostgresUserService

        return Ok(new
        {
            token,
            refreshToken,
            username = user.Username
        });
    }

    // ------------------- REFRESH TOKEN -------------------
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(TokenRequest tokenRequest)
    {
        var user = await _userService.GetByRefreshTokenAsync(tokenRequest.RefreshToken);

        if (user == null || user.RefreshTokenExpiryTime < DateTime.UtcNow)
            return Unauthorized("Invalid or expired refresh token");

        var newToken = TokenHelper.GenerateJwtToken(user, _config);
        var newRefresh = TokenHelper.GenerateRefreshToken();

        user.RefreshToken = newRefresh;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _userService.UpdateUser(user); // Update the user's refresh token in the database

        return Ok(new
        {
            token = newToken,
            refreshToken = newRefresh,
            username = user.Username
        });
    }

    [HttpGet("throw")]
    public IActionResult ThrowError()
    {
        throw new Exception("This is a test exception!");
    }
}