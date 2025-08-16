// Program.cs
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using PolicyManagement.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using PolicyManagement.Validators;
using PolicyManagement.Middleware;
using PolicyManagement.Data; // Add this line
using Microsoft.EntityFrameworkCore; // Add this line

var builder = WebApplication.CreateBuilder(args);

// 🔐 JWT Permissions to configure policies
string[] permissions = new[]
{
    "Policy.Add", "Policy.Edit", "Policy.Delete", "Policy.List",
    "Document.Add", "Document.List"
};

// ✅ Add Controllers
builder.Services.AddControllers();

// ✅ FluentValidation (latest)
builder.Services
    .AddFluentValidationAutoValidation()
    .AddFluentValidationClientsideAdapters();

builder.Services.AddValidatorsFromAssemblyContaining<CreatePolicyDtoValidator>();

// ✅ Add Swagger for testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()    // Allow any domain
            .AllowAnyHeader()    // Allow any header
            .AllowAnyMethod();   // Allow any HTTP method (GET, POST, etc.)
    });
});
// ✅ Add Authorization Policies
builder.Services.AddAuthorization(options =>
{
    foreach (var permission in permissions)
    {
        options.AddPolicy(permission, policy =>
            policy.RequireClaim("permission", permission));
    }
});

// ✅ JWT Authentication configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? throw new Exception("Issuer missing"),
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? throw new Exception("Audience missing"),
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new Exception("Key missing")))
        };
    });

// ⚡️ Add DbContext and Configure PostgreSQL
builder.Services.AddDbContext<PolicyManagementDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseNpgsql(connectionString);
});

// ⚡️ Register custom user service, switching from JsonUserService to PostgresUserService
builder.Services.AddScoped<IUserService, PostgresUserService>();

var app = builder.Build();

// ✅ Swagger UI middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // ⚡️ Apply migrations automatically on startup
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<PolicyManagementDbContext>();
        db.Database.Migrate();
    }
}
app.UseMiddleware<ExceptionMiddleware>();
// ✅ Middleware pipeline
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
// ❗️ Remove the code for the JSON file, as it is no longer needed.
// var userJsonPath = Path.Combine(AppContext.BaseDirectory, "Data/users.json");
// PolicyManagement.Tools.PasswordHasher.HashAllPasswords(userJsonPath);
app.Run();