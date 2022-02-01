using System;
using AppSite.Domain.Shared;
using Newtonsoft.Json;

namespace AppSite.Domain.Connections
{
    public class ConnectionId : EntityId
    {
        [JsonConstructor]
        public ConnectionId(Guid value) : base(value)
        {
        }

        public ConnectionId(String value) : base(value)
        {
        }

        protected override Object CreateFromString(String text)
        {
            return new Guid(text);
        }

        public override String AsString()
        {
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }

        public Guid AsGuid()
        {
            return (Guid) base.ObjValue;
        }
    }
}