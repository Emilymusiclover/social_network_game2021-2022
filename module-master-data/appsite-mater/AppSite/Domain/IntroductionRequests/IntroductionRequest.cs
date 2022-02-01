using System;
using System.Collections.Generic;
using System.Threading;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;

namespace AppSite.Domain.IntroductionRequests
{
    public class IntroductionRequest : Entity<IntroductionRequestId>, IAggregateRoot
    {
        public IntroductionState introductionState { get; set; }

        public IntroductionText introductionText { get; set; }

        public ConnectionText connectionText { get; set; }

        public User targetUser { get; set; }

        public User intermediateUser { get; set; }

        public User introductionUser { get; set; }

        private IntroductionRequest()
        {
        }

        public IntroductionRequest(IntroductionState introductionState, User targetUser, User intermediateUser,
            User introductionUser, IntroductionText introductionText, ConnectionText connectionText)
        {
            this.Id = new IntroductionRequestId(Guid.NewGuid());
            this.introductionState = introductionState;
            this.targetUser = targetUser;
            this.intermediateUser = intermediateUser;
            this.introductionUser = introductionUser;
            this.introductionText = introductionText;
            this.connectionText = connectionText;
        }

        public void changeState(string state)
        {
            if (state.Equals("accepted"))
            {
                introductionState = IntroductionState.accepted;
            }
            else
            {
                if (state.Equals("rejected"))
                {
                    introductionState = IntroductionState.rejected;
                }
            }
        }

        public IntroductionRequestDto AsDto()
        {
            return new IntroductionRequestDto
            {
                Id = this.Id.AsGuid(),
                IntroductionRequestText = this.introductionText.introText,
                ConnectionRequestText = this.connectionText.connectionText,
                IntroductionRequestState = " " + this.introductionState,
                TargetUserDto = this.targetUser == null ? null : this.targetUser.AsDto(),
                IntermediateUserDto = this.intermediateUser == null ? null : intermediateUser.AsDto(),
                IntroductionUserDto = this.introductionUser == null ? null : introductionUser.AsDto(),
            };
        }

        public override bool Equals(object obj)
        {
            return obj is IntroductionRequest introductionRequest &&
                   EqualityComparer<IntroductionRequestId>.Default.Equals(Id, introductionRequest.Id);
        }

        public override int GetHashCode()
        {
            int hashCode = -650675842;
            hashCode = hashCode * -1521134295 + EqualityComparer<User>.Default.GetHashCode(targetUser);
            hashCode = hashCode * -1521134295 + EqualityComparer<User>.Default.GetHashCode(intermediateUser);
            hashCode = hashCode * -1521134295 + EqualityComparer<User>.Default.GetHashCode(introductionUser);

            return hashCode;
        }
    }
}