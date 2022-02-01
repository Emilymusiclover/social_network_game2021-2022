using System;
using System.Collections.Generic;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Tags
{
    public class TagCloud : Entity<TagCloudId>, IAggregateRoot, IDtoable<TagCloudDto>
    {
        public List<Tag> Tags { get; set; }

        public TagCloud()
        {
            Id = new TagCloudId(Guid.NewGuid());
            Tags = new List<Tag>();
        }

        public TagCloud(List<Tag> tags)
        {
            Id = new TagCloudId(Guid.NewGuid());
            Tags = tags;
        }

        public TagCloudDto AsDto()
        {
            return new TagCloudDto
            {
                Id = Id.AsGuid(),
                Tags = Tags.ConvertAll(tag => tag.AsDto()),
            };
        }

        public override bool Equals(object obj)
        {
            return obj is TagCloud tagCloud &&
                   EqualityComparer<TagCloudId>.Default.Equals(Id, tagCloud.Id);
        }

        public override int GetHashCode()
        {
            throw new NotImplementedException();
        }

        public void AddTagsToTagCloud(List<String> tags)
        {
            tags.ForEach(tag => Tags.Add(new Tag(TagName.ValueOf(tag))));
        }

        public void ChangeTags(List<Tag> tags)
        {
            Tags = tags;
        }
    }
}