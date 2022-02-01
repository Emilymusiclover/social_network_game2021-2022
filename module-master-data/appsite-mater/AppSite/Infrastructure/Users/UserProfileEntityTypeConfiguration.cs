using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppSite.Domain.Users;

namespace AppSite.Infrastructure.Users
{
    internal class UserProfileEntityTypeConfiguration : IEntityTypeConfiguration<UserProfile>
    {
        public void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx


            builder.HasKey(b => b.Id);

            builder.OwnsOne(b => b.ProfileUserName);
            builder.OwnsOne(b => b.UserBirthDate);
            builder.OwnsOne(b => b.UserDescription);
            builder.OwnsOne(b => b.UserResidency);
            builder.OwnsOne(b => b.UserPhone);
        }
    }
}