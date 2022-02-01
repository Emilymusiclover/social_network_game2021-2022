using Newtonsoft.Json.Converters;

namespace AppSite.Domain.Users
{
    class JsonDateConverter : IsoDateTimeConverter
    {
        public JsonDateConverter()
        {
            DateTimeFormat = "dd-MM-yyyy";
        }
    }
}