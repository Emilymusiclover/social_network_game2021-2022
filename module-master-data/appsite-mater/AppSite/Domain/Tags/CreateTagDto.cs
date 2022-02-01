using System;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;


namespace AppSite.Domain.Tags
{
    public class CreateTagDto : IDto<Tag>
    {
        [MinLength(1)] [MaxLength(255)] public string Tag { get; set; }


        public CreateTagDto()
        {
        }

        public CreateTagDto(string TagName)
        {
            this.Tag = TagName;
        }


        public Tag Convert()
        {
            TagName tag = TagName.ValueOf(Tag);

            return new Tag(tag);
        }
    }
}