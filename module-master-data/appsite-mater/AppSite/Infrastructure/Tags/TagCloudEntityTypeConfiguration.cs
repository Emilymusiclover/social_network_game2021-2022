using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppSite.Domain.Tags;
using System.Threading.Tasks.Dataflow;

namespace AppSite.Infrastructure.Tags
{
    internal class TagCloudEntityTypeConfiguration : IEntityTypeConfiguration<TagCloud>
    {
        public void Configure(EntityTypeBuilder<TagCloud> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("User", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasMany(b => b.Tags);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}