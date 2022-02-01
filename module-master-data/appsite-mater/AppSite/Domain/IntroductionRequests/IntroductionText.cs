using AppSite.Domain.Shared;
using Newtonsoft.Json;

namespace AppSite.Domain.IntroductionRequests
{
    public class IntroductionText : IValueObject
    {
        public string introText { get; set; }

        [JsonConstructor]
        public IntroductionText()
        {
        }

        public IntroductionText(string text)
        {
            this.introText = text;
        }

        public static IntroductionText ValueOf(string text)
        {
            return new IntroductionText(text);
        }
    }
}