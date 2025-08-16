using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PolicyManagement.Models;
using PolicyManagement.Services;
using PolicyManagement.Models.DTOs;

namespace PolicyManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }


    [HttpGet]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetAllUsers()
    {
        var users = _userService.GetAllUsers();
        
        return Ok(users);
    }

   [HttpGet("{userId}")]
[Authorize(Roles = "Admin")]
public IActionResult GetUserById(string userId)
{
    if (!int.TryParse(userId, out int id))
    {
        return BadRequest("Invalid user ID format.");
    }
    
    var user = _userService.GetAllUsers().FirstOrDefault(u => u.UserId == id);

    if (user == null)
    {
        return NotFound("User not found.");
    }

    return Ok(user);
} 
    
}
