using System;
using Xunit;
using AppSite.Domain.ConnectionRequests;
using AppSite.Domain.Users;
using AppSite.Domain.Tags;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace AppSiteTests
{
    public class ConnectionRequestsTest 
    {

        [Fact]
        public void CreateConnectionRequestTest()
        {
            //Arrange
            var dto = CreateConnectionRequest();

            
            //Act

              var lstErrors = ValidateModel(dto);

            //Assert
            
            Assert.True(lstErrors.Count() == 0);
     }

        private CreateConnectionRequestDto CreateConnectionRequest() {
            var user1 = CreateUser1().Convert();
            var user2 = CreateUser2().Convert();
            string connectionText = "Hello, can you be my friend?";

            var dto = new CreateConnectionRequestDto{UserReceive = user1.Id.AsGuid(), 
                                                    UserSent = user2.Id.AsGuid(), 
                                                    ConnectionText = connectionText};
            return dto;
        }        
        private RegisterUserDto CreateUser2()
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
        private RegisterUserDto CreateUser1()
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