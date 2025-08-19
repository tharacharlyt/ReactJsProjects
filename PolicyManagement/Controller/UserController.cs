using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PolicyManagement.Models;
using PolicyManagement.Services;
using PolicyManagement.Models.DTOs;
using PolicyManagement.DTOs;

namespace PolicyManagement.Controller;

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
    [Authorize(Roles = "Admin")]
    public IActionResult GetAllUsers()
    {
        var users = _userService.GetAllUsers();
        
        return Ok(users);
    }

    [HttpGet("{userId}")]
    // [Authorize(Roles = "Admin")]
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
    
[HttpPut("{id}")]
public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserRequest user)
{
    if (user == null || id <= 0)
    {
        return BadRequest(new { message = "❌ Invalid user data." });
    }

    if (id != user.UserId)
    {
        return BadRequest(new { message = "❌ ID in URL does not match body." });
    }

    if (!ModelState.IsValid)
    {
        return BadRequest(new { message = "❌ Validation failed.", errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
    }

    try
    {
        await _userService.UpdateUser(user);
        return Ok(new { message = "✅ User updated successfully.", user });
    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, new { message = "❌ Error updating user.", details = ex.Message });
    }
}

  
}