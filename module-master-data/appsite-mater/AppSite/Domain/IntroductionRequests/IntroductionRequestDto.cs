using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Routing;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;

namespace AppSite.Domain.IntroductionRequests
{
    public class IntroductionRequestDto : IDto<IntroductionRequest>
    {
        public Guid Id { get; set; }
        [Required] public string IntroductionRequestText { get; set; }
        public string ConnectionRequestText { get; set; }
        public string IntroductionRequestState { get; set; }
        public UserDto TargetUserDto { get; set; }
        public UserDto IntermediateUserDto { get; set; }
        public UserDto IntroductionUserDto { get; set; }

        public IntroductionRequestDto()
        {
        }

        public IntroductionRequestDto(Guid id, string introductionText, string connectionText, string introductionState,
            UserDto targetUserDto, UserDto intermediateUserDto, UserDto introductionUserDto)
        {
            this.Id = id;
            this.IntroductionRequestText = introductionText;
            this.ConnectionRequestText = connectionText;
            this.IntroductionRequestState = introductionState;
            this.TargetUserDto = targetUserDto;
            this.IntermediateUserDto = intermediateUserDto;
            this.IntroductionUserDto = introductionUserDto;
        }

        public override bool Equals(object obj)
        {
            return obj is IntroductionRequestDto dto &&
                   Id.Equals(dto.Id);
        }

        public IntroductionRequest Convert()
        {
            IntroductionText introductionText = IntroductionText.ValueOf(IntroductionRequestText);
            ConnectionText connectionText = ConnectionText.ValueOf(ConnectionRequestText);
            IntroductionState introductionState;
            if (IntroductionRequestState.Equals("accepted"))
            {
                introductionState = IntroductionState.accepted;
            }
            else
            {
                if (IntroductionRequestState.Equals("pendent"))
                {
                    introductionState = IntroductionState.pendent;
                }
                else
                {
                    introductionState = IntroductionState.rejected;
                }
            }

            return new IntroductionRequest(introductionState, TargetUserDto.Convert(), IntermediateUserDto.Convert(),
                IntroductionUserDto.Convert(), introductionText, connectionText);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}