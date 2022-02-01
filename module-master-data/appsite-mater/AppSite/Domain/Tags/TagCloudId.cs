using System;
using System.Text.Json.Serialization;
using AppSite.Domain.Shared;


namespace AppSite.Domain.Tags
{
    public class TagCloudId : EntityId
    {
        [JsonConstructor]
        public TagCloudId(Guid value) : base(value)
        {
        }

        public TagCloudId(String value) : base(value)
        {
        }

        public override string AsString()
        {
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }

        protected override object CreateFromString(string text)
        {
            return new Guid(text);
        }

        public Guid AsGuid()
        {
            return (Guid) base.ObjValue;
        }
    }
}