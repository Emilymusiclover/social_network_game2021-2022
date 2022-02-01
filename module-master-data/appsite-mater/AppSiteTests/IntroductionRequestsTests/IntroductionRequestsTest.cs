using System;
using Xunit;
using Moq;
using AppSite.Domain.Shared;
using AppSite.Domain.IntroductionRequests;
using AppSite.Domain.Users;
using AppSite.Domain.Tags;
using AppSite.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace AppSiteTests
{
    public class IntroductionRequestsTest 
    {
    
         [Fact]
        public void CreateIntroductionRequestTest()
        {
            //Arrange
            var dto = CreateIntroductionRequest();

            
            //Act

              var lstErrors = ValidateModel(dto);

            //Assert
            
            Assert.True(lstErrors.Count() == 0);
     }
        private CreateIntroductionRequestDto CreateIntroductionRequest() {
            var introductionUser = CreateIntroductionUser().Convert();
            var intermediateUser = CreateIntermediateUser().Convert();
            var targetUser = CreateTargetUser().Convert();
            string introductionText = "Hello, can you introduce me?";
            string connectionText = "Hello, can you be my friend?";

            var dto = new CreateIntroductionRequestDto(targetUser.Id.AsGuid(), intermediateUser.Id.AsGuid(), introductionUser.Id.AsGuid(), introductionText,connectionText);

            return dto;
        }
        private RegisterUserDto CreateIntermediateUser()
        {
            var tagsList = new List<CreateTagDto>();
            tagsList.Add(new CreateTagDto("TagTest"));
            var tagCloudDto = new CreateTagCloudDto(tagsList);

            var profileDto = new RegisterUserProfileDto
            {
                ProfileUserName = "Emily",
                UserBirthDate = new DateTime(2001, 12, 31),
                UserCountry = "Portugal",
                UserCity = "Porto",
                UserDescription = "Hey!",
                UserPhone = "+351989767895",
                UserTagCloud = tagCloudDto
            };
            var UserEmail = "emi@gmail.com";
            var UserPassword = "Password.123";
            var UserProfile = profileDto;
            var dto = new RegisterUserDto(UserEmail, UserPassword, UserProfile);

            return dto;
        }

        private RegisterUserDto CreateTargetUser()
        {
            var tagsList = new List<CreateTagDto>();
            tagsList.Add(new CreateTagDto("TagTest"));
            var tagCloudDto = new CreateTagCloudDto(tagsList);

            var profileDto = new RegisterUserProfileDto
            {
                ProfileUserName = "Catarina",
                UserBirthDate = new DateTime(2001, 12, 31),
                UserCountry = "Portugal",
                UserCity = "Porto",
                UserDescription = "Hey!",
                UserPhone = "+351989767895",
                UserTagCloud = tagCloudDto
            };
            var UserEmail = "cat@gmail.com";
            var UserPassword = "Password.123";
            var UserProfile = profileDto;
            var dto = new RegisterUserDto(UserEmail, UserPassword, UserProfile);

            return dto;
        }

        private RegisterUserDto CreateIntroductionUser()
        {
            var tagsList = new List<CreateTagDto>();
            tagsList.Add(new CreateTagDto("TagTest"));
            var tagCloudDto = new CreateTagCloudDto(tagsList);

            var profileDto = new RegisterUserProfileDto
            {
                ProfileUserName = "Carlos",
                UserBirthDate = new DateTime(2001, 12, 31),
                UserCountry = "Portugal",
                UserCity = "Porto",
                UserDescription = "Hey!",
                UserPhone = "+351989767895",
                UserTagCloud = tagCloudDto
            };
            var UserEmail = "car@gmail.com";
            var UserPassword = "Password.123";
            var UserProfile = profileDto;
            var dto = new RegisterUserDto(UserEmail, UserPassword, UserProfile);

            return dto;
        }
        
        private IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }
    }
}
    