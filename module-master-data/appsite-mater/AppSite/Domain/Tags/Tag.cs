using System;
using System.Collections.Generic;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Tags
{
    public class Tag : Entity<TagId>, IDtoable<TagDto>
    {
        public TagName TagName { get; set; }

        public Tag()
        {
        }

        public Tag(TagName tag)
        {
            Id = new TagId(Guid.NewGuid());
            TagName = tag;
        }

        public TagDto AsDto()
        {
            return new TagDto
            {
                Id = Id.AsGuid(),
                Tag = TagName.TagString,
            };
        }

        public override bool Equals(object obj)
        {
            return obj is Tag tag &&
                   EqualityComparer<TagId>.Default.Equals(Id, tag.Id);
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}