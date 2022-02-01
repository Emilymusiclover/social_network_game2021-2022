using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AppSite.Domain.IntroductionRequests;

namespace AppSite.Infrastructure.IntroductionRequests
{
    internal class IntroductionRequestEntityTypeConfiguration : IEntityTypeConfiguration<IntroductionRequest>
    {
        public void Configure(EntityTypeBuilder<IntroductionRequest> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            builder.HasKey(b => b.Id);

            // value object configuration
            builder.OwnsOne(b => b.introductionText);
            builder.OwnsOne(b => b.connectionText);
            builder.HasOne(b => b.intermediateUser);
            // builder.OwnsOne(b => b.introductionState);
            builder.HasOne(b => b.introductionUser);
            builder.HasOne(b => b.targetUser);
        }
    }
}