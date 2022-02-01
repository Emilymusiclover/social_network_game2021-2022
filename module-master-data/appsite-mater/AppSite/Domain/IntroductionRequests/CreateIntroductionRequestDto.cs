using System;

namespace AppSite.Domain.IntroductionRequests
{
    public class CreateIntroductionRequestDto
    {
        public Guid targetUser { get; set; }
        public Guid intermediateUser { get; set; }
        public Guid introductionUser { get; set; }
        public string introductionText { get; set; }

        public string connectionText { get; set; }

        public CreateIntroductionRequestDto(Guid targetUser, Guid intermediateUser, Guid introductionUser,
            string introductionText, string connectionText)
        {
            this.targetUser = targetUser;
            this.intermediateUser = intermediateUser;
            this.introductionUser = introductionUser;
            this.introductionText = introductionText;
            this.connectionText = connectionText;
        }
    }
}