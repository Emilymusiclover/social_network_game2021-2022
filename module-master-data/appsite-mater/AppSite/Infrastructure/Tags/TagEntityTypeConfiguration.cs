using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppSite.Domain.Tags;
using System.Threading.Tasks.Dataflow;

namespace AppSite.Infrastructure.Tags
{
    internal class TagEntityTypeConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("User", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.TagName);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}