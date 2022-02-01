using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;


namespace AppSite.Domain.Tags
{
    public class CreateTagCloudDto : IDto<TagCloud>
    {
        public List<CreateTagDto> Tags { get; set; }


        public CreateTagCloudDto()
        {
        }

        public CreateTagCloudDto(List<CreateTagDto> tags)
        {
            this.Tags = tags;
        }


        public TagCloud Convert()
        {
            List<Tag> tags = Tags.ConvertAll<Tag>(tag => tag.Convert());
            return new TagCloud(tags);
        }
    }
}