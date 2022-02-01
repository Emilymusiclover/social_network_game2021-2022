using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;


namespace AppSite.Domain.Tags
{
    public class TagCloudDto : IDto<TagCloud>
    {
        public Guid Id { get; set; }


        public List<TagDto> Tags { get; set; }


        public TagCloudDto()
        {
        }

        public TagCloudDto(Guid Id, List<TagDto> tags)
        {
            this.Id = Id;
            this.Tags = tags;
        }


        public TagCloud Convert()
        {
            List<Tag> tags = Tags.ConvertAll<Tag>(tag => tag.Convert());
            return new TagCloud(tags);
        }
    }
}