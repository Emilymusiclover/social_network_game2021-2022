using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppSite.Domain.ConnectionRequests;

namespace AppSite.Infrastructure.ConnectionRequests
{
    internal class ConnectionRequestEntityTypeConfiguration : IEntityTypeConfiguration<ConnectionRequest>
    {
        public void Configure(EntityTypeBuilder<ConnectionRequest> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            builder.HasKey(b => b.Id);
            // builder.OwnsOne(b => b.connectionRequestState);
            builder.HasOne(b => b.UserSent);
            builder.HasOne(b => b.UserReceive);
            builder.OwnsOne(b => b.ConnectionText);
        }
    }
}