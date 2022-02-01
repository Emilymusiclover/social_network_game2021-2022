using System;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;


namespace AppSite.Domain.Tags
{
    public class TagDto : IDto<Tag>
    {
        public Guid Id { get; set; }

        [MinLength(1)] [MaxLength(255)] public string Tag { get; set; }


        public TagDto()
        {
        }

        public TagDto(Guid Id, string TagName)
        {
            this.Id = Id;
            this.Tag = TagName;
        }


        public Tag Convert()
        {
            TagName tag = TagName.ValueOf(Tag);

            return new Tag(tag);
        }
    }
}