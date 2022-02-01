using Microsoft.EntityFrameworkCore;
using AppSite.Domain.Users;
using AppSite.Infrastructure.Tags;
using AppSite.Domain.Tags;
using AppSite.Infrastructure.Users;
using AppSite.Domain.Connections;
using AppSite.Infrastructure.Connections;
using AppSite.Domain.IntroductionRequests;
using AppSite.Infrastructure.IntroductionRequests;
using AppSite.Domain.ConnectionRequests;
using AppSite.Infrastructure.ConnectionRequests;


namespace AppSite.Infrastructure
{
    public class AppSiteContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<IntroductionRequest> IntroductionRequests { get; set; }
        public DbSet<ConnectionRequest> ConnectionRequests { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TagCloud> TagClouds { get; set; }

        public AppSiteContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UserProfileEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IntroductionRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectionRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TagEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TagCloudEntityTypeConfiguration());
        }
    }
}