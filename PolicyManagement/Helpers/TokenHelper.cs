using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PolicyManagement.Models;

namespace PolicyManagement.Helpers;

public static class TokenHelper
{
    public static string GenerateJwtToken(User user, IConfiguration config)
    {
        var claims = new List<Claim>
        {
            new Claim("userId", user.UserId.ToString()), // Convert UserId to string
            new Claim("name", user.Name),
            new Claim("username", user.Username),
        };

        // Use the NotMapped properties to access the lists
        foreach (var role in user.RolesList)
            claims.Add(new Claim(ClaimTypes.Role, role));

        foreach (var permission in user.PermissionsList)
            claims.Add(new Claim("permission", permission));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static string GenerateRefreshToken()
    {
        return Guid.NewGuid().ToString();
    }

    public static ClaimsPrincipal? GetPrincipalFromExpiredToken(string token, IConfiguration config)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!)),
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            ValidateLifetime = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

        if (securityToken is not JwtSecurityToken jwt ||
            !jwt.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            throw new SecurityTokenException("Invalid token");

        return principal;
    }
}