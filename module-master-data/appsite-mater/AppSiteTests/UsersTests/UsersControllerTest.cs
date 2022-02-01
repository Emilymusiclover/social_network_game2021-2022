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

namespace AppSiteTests
{
    public class UsersControllerTest
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();

        private readonly Mock<IUserRepository> _repoStub = new();
        private readonly Mock<IUserProfileRepository> _repoProfileStub = new();

        private readonly Mock<ITagCloudRepository> _repoTagCloud = new();
        private readonly Mock<ITagRepository> _repoTag = new();

        [Fact]
        public async Task GetUserById_WithUnexistingUser_ReturnNotFound()
        {
            //Arrange
            var service = new UserService(_unitOfWork.Object, _repoStub.Object, _repoProfileStub.Object,
                _repoTagCloud.Object, _repoTag.Object);

            var controller = new UsersController(service);

            //Act
            var result = await controller.GetGetById(Guid.NewGuid());

            //Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task CreateValidUser_ReturnUser()
        {
            //Arrange
            var service = new UserService(_unitOfWork.Object, _repoStub.Object, _repoProfileStub.Object,
                _repoTagCloud.Object, _repoTag.Object);

            var controller = new UsersController(service);

            var dto = CreateUser();


            var userDto = await controller.Register(dto);

            //Act

            var userResult = userDto.Result as CreatedAtActionResult;
            var actualValue = userResult.Value as UserDto;


            //Assert
            Assert.IsType<UserDto>(actualValue);
            Assert.IsType<CreatedAtActionResult>(userDto.Result);
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
    }
}