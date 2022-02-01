using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppSite.Domain.Connections;

namespace AppSite.Infrastructure.Connections
{
    internal class ConnectionEntityTypeConfiguration : IEntityTypeConfiguration<Connection>
    {
        public void Configure(EntityTypeBuilder<Connection> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Connection", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");

            // value object configuration
            // builder.OwnsOne(b => b.UserId1);
            // builder.OwnsOne(b => b.UserId2);
            builder.OwnsOne(b => b.Strength1);
            builder.OwnsOne(b => b.Strength2);
            builder.OwnsOne(b => b.BondValue);
        }
    }
}