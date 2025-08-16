// Data/PolicyManagementDbContext.cs
using Microsoft.EntityFrameworkCore;
using PolicyManagement.Models;

namespace PolicyManagement.Data;

public class PolicyManagementDbContext : DbContext
{
    // The constructor is needed to pass database options to the base DbContext class.
    public PolicyManagementDbContext(DbContextOptions<PolicyManagementDbContext> options)
        : base(options)
    {
    }

    // This property maps the User model to a table named "Users" in your database.
    public DbSet<User> Users { get; set; }

    // This method is used to configure the model's structure before it's created in the database.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            // Sets UserId as the primary key for the 'Users' table.
            entity.HasKey(e => e.UserId);
            
            // Specifies that the Username column is required and cannot be null.
            entity.Property(e => e.Username).IsRequired();
            
            // Creates a unique index on the Username column to prevent duplicate usernames.
            entity.HasIndex(e => e.Username).IsUnique();
        });
    }
}