using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppSite.Domain.Users;
using System.Threading.Tasks.Dataflow;

namespace AppSite.Infrastructure.Users
{
    internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            // builder.ToTable("User", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.UserEmail);
            builder.OwnsOne(b => b.UserPassword);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}