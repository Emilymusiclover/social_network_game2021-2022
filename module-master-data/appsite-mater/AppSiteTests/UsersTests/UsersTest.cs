using System;
using Xunit;
using Moq;
using AppSite.Domain.Shared;
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
    public class UsersTest
    {
    

        
        [Fact]
        public void CreateValidUser_ReturnUser()
        {
            //Arrange
       

            var dto = CreateUser();


            //Act

            var userResult = dto.Convert();
           


            //Assert
            Assert.IsType<User>(userResult);
            Assert.NotNull(userResult);
           
        }

        [Fact]
        public void CreateInvalidUser_InvalidEmailTest()
        {
            //Arrange
       

            var dto = CreateInvalidUser_InvalidEmail();

            
            //Act

              var lstErrors = ValidateModel(dto);

            //Assert
            
            Assert.True(lstErrors.Where(x => x.ErrorMessage.Contains("The UserEmail field is not a valid e-mail address.")).Count() > 0);
        }

        [Fact]
        public void CreateInvalidUser_UnderAge16Test()
        {
            //Arrange
       

            var dto = CreateInvalidUser_UnderAge16();

            
            //Act

              var lstErrors = ValidateModel(dto);

            //Assert
            
            Assert.True(lstErrors.Where(x => x.ErrorMessage.Contains("User should be at least 16 years old to access.")).Count() > 0);
        }

         [Fact]
        public void CreateInvalidUser_InvalidProfileNameTest()
        {
            //Arrange
       

            var dto = CreateInvalidUser_InvalidProfileName();

            
            //Act

              var lstErrors = ValidateModel(dto);

            //Assert
            
            Assert.True(lstErrors.Where(x => x.ErrorMessage.Contains("Must be aplhanumeric and without space!")).Count() > 0);
        }

        [Fact]
        public void CreateInvalidUser_InvalidPhoneNumberTest()
        {
            //Arrange
       

            var dto = CreateInvalidUser_InvalidPhoneNumber();

            
            //Act

              var lstErrors = ValidateModel(dto);

            //Assert
            
            Assert.True(lstErrors.Where(x => x.ErrorMessage.Contains("Must follow format + country code phone_number")).Count() > 0);
        }
        private RegisterUserDto CreateUser()
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

         private RegisterUserDto CreateInvalidUser_InvalidEmail()
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
            var UserEmail = "emigmail.com";
            var UserPassword = "Password.123";
            var UserProfile = profileDto;
            var dto = new RegisterUserDto(UserEmail, UserPassword, UserProfile);

            return dto;
        }

        private RegisterUserProfileDto CreateInvalidUser_UnderAge16()
        {
            var tagsList = new List<CreateTagDto>();
            tagsList.Add(new CreateTagDto("TagTest"));
            var tagCloudDto = new CreateTagCloudDto(tagsList);

             var ProfileUserName = "Emily";
               var  UserBirthDate = new DateTime(2020, 12, 31);
               var UserCountry = "Portugal";
               var UserCity = "Porto";
               var  UserDescription = "Hey!";
               var UserPhone = "+351989767895";
               var UserTagCloud = tagCloudDto;
            var profileDto = new RegisterUserProfileDto(ProfileUserName,UserBirthDate,UserCountry,UserCity,UserDescription,UserPhone,UserTagCloud);

            /**var UserEmail = "emi@gmail.com";
            var UserPassword = "Password.123";
            var UserProfile = profileDto;
            var dto = new RegisterUserDto(UserEmail, UserPassword, UserProfile);
*/
            return profileDto;
        }

         private RegisterUserProfileDto CreateInvalidUser_InvalidProfileName()
        {
            var tagsList = new List<CreateTagDto>();
            tagsList.Add(new CreateTagDto("TagTest"));
            var tagCloudDto = new CreateTagCloudDto(tagsList);

             var ProfileUserName = " Emily";
               var  UserBirthDate = new DateTime(2001, 12, 31);
               var UserCountry = "Portugal";
               var UserCity = "Porto";
               var  UserDescription = "Hey!";
               var UserPhone = "+351989767895";
               var UserTagCloud = tagCloudDto;
            var profileDto = new RegisterUserProfileDto(ProfileUserName,UserBirthDate,UserCountry,UserCity,UserDescription,UserPhone,UserTagCloud);

            /**var UserEmail = "emi@gmail.com";
            var UserPassword = "Password.123";
            var UserProfile = profileDto;
            var dto = new RegisterUserDto(UserEmail, UserPassword, UserProfile);
*/
            return profileDto;
        }

         private RegisterUserProfileDto CreateInvalidUser_InvalidPhoneNumber()
        {
            var tagsList = new List<CreateTagDto>();
            tagsList.Add(new CreateTagDto("TagTest"));
            var tagCloudDto = new CreateTagCloudDto(tagsList);

             var ProfileUserName = "Emily";
               var  UserBirthDate = new DateTime(2001, 12, 31);
               var UserCountry = "Portugal";
               var UserCity = "Porto";
               var  UserDescription = "Hey!";
               var UserPhone = "989767895";
               var UserTagCloud = tagCloudDto;
            var profileDto = new RegisterUserProfileDto(ProfileUserName,UserBirthDate,UserCountry,UserCity,UserDescription,UserPhone,UserTagCloud);

            /**var UserEmail = "emi@gmail.com";
            var UserPassword = "Password.123";
            var UserProfile = profileDto;
            var dto = new RegisterUserDto(UserEmail, UserPassword, UserProfile);
*/
            return profileDto;
        }
        //Unit Test DataAnnotations
        //http://stackoverflow.com/questions/2167811/unit-testing-asp-net-dataannotations-validation
        private IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }
    }

       
}