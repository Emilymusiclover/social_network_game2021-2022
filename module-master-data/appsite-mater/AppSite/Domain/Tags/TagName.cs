using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Tags
{
    public class TagName : IValueObject
    {
        public string TagString { get; set; }


        public TagName()
        {
        }

        public TagName(string tag)
        {
            this.TagString = tag;
        }

        public static TagName ValueOf(string tag)
        {
            return new TagName(tag);
        }
    }
}