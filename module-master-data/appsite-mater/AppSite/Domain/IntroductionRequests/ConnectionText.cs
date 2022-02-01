using AppSite.Domain.Shared;
using Newtonsoft.Json;

namespace AppSite.Domain.IntroductionRequests
{
    public class ConnectionText : IValueObject
    {
        public string connectionText { get; set; }

        [JsonConstructor]
        public ConnectionText()
        {
        }

        public ConnectionText(string text)
        {
            this.connectionText = text;
        }

        public static ConnectionText ValueOf(string text)
        {
            return new ConnectionText(text);
        }
    }
}