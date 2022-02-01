using System;
using Xunit;
using Moq;
using AppSite.Domain.ConnectionRequests;
using AppSite.Domain.Connections;
using AppSite.Domain.Users;
using AppSite.Domain.Shared;
using AppSite.Domain.Tags;
using AppSite.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AppSiteTests
{
    public class ConnectionRequestControllerTest
    {

        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IConnectionRequestRepository> _repoConnectionRequest = new();
        private readonly Mock<IConnectionRepository> _repoConnection = new();

        private readonly Mock<IUserRepository> _repoUser = new();
        private readonly Mock<IUserProfileRepository> _repoUserProfile = new();
        private readonly Mock<ITagRepository> _repoTag = new();
        private readonly Mock<ITagCloudRepository> _repoTagCloud = new();


        [Fact]
        public async Task GetAll_NoConnectionRequests()
        {
            var service = new ConnectionRequestService(_unitOfWork.Object, _repoConnectionRequest.Object, _repoUser.Object, _repoConnection.Object);

            var controller = new ConnectionRequestController(service);

            var result = await controller.GetAll();

            Assert.IsType<BadRequestObjectResult>(result.Result);  
        }

         [Fact]
        public async Task GetAllPendent_NoPendentConnectionRequests()
        {
            var service = new ConnectionRequestService(_unitOfWork.Object, _repoConnectionRequest.Object, _repoUser.Object, _repoConnection.Object);

            var controller = new ConnectionRequestController(service);

            var result = await controller.GetAllPendent();

            Assert.IsType<BadRequestObjectResult>(result.Result);  
        }

        [Fact]
        public async Task GetById_NotFound()
        {
           var service = new ConnectionRequestService(_unitOfWork.Object, _repoConnectionRequest.Object, _repoUser.Object, _repoConnection.Object);

            var controller = new ConnectionRequestController(service);
            var connectionRequest = Guid.NewGuid();

            var result = await controller.GetById(connectionRequest);

            Assert.IsType<NotFoundResult>(result.Result);  
        }

        [Fact]
        public async Task GetMyPendent_NotFound()
        {
            var service = new ConnectionRequestService(_unitOfWork.Object, _repoConnectionRequest.Object, _repoUser.Object, _repoConnection.Object);

            var controller = new ConnectionRequestController(service);
            var user = Guid.NewGuid();

            var result = await controller.GetMyPendent(user);

            Assert.IsType<BadRequestObjectResult>(result.Result);  
        }

        [Fact]
        public async Task Update_NotFound()
        {
            var service = new ConnectionRequestService(_unitOfWork.Object, _repoConnectionRequest.Object, _repoUser.Object, _repoConnection.Object);

            var controller = new ConnectionRequestController(service);
            var connectionRequest = Guid.NewGuid();
            string change = "accept";

            var result = await controller.Update(connectionRequest,change);

            Assert.IsType<BadRequestResult>(result.Result);  
        }

           [Fact]
        public async Task CreateInvalidIntroductionRequest_NoIntermediateConnection()
        {
            //Arrange
            var service = new ConnectionRequestService(_unitOfWork.Object, _repoConnectionRequest.Object, _repoUser.Object, _repoConnection.Object);

            var controller = new ConnectionRequestController(service);

            var dto = CreateConnectionRequest();

            var result = await controller.Create(dto);

             //Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);  
            
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
    }

}