using System;
using Xunit;
using Moq;
using AppSite.Domain.Shared;
using AppSite.Domain.IntroductionRequests;
using AppSite.Domain.ConnectionRequests;
using AppSite.Domain.Connections;
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
    public class IntroductionRequestsControllerTest
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IIntroductionRequestRepository> _repoIntroductionRequest = new();
        private readonly Mock<IUserRepository> _repoUser = new();
        private readonly Mock<IConnectionRequestRepository> _repoConnectionRequest = new();
        private readonly Mock<IConnectionRepository> _repoConnection = new();
        private readonly Mock<IUserProfileRepository> _repoUserProfile = new();
        private readonly Mock<ITagRepository> _repoTag = new();
        private readonly Mock<ITagCloudRepository> _repoTagCloud = new();


        [Fact]
        public async Task GetAll_NoIntroductionRequests()
        {
            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);

            var result = await controller.GetAll();

            Assert.IsType<BadRequestObjectResult>(result.Result);  
        }

        [Fact]
        public async Task GetAllPendent_NoPendentIntroductionRequests()
        {
            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);

            var result = await controller.GetAllPendent();

            Assert.IsType<BadRequestObjectResult>(result.Result);  
        }

        [Fact]
        public async Task GetById_NotFound()
        {
            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);
            var introductionRequest = Guid.NewGuid();

            var result = await controller.GetById(introductionRequest);

            Assert.IsType<NotFoundResult>(result.Result);  
        }

        [Fact]
        public async Task GetByIntroUserId_NotFound()
        {
            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);
            var introductionUser = Guid.NewGuid();

            var result = await controller.GetByIntroUserId(introductionUser);

            Assert.IsType<BadRequestObjectResult>(result.Result);  
        }

        [Fact]
        public async Task GetMyPendent_NotFound()
        {
            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);
            var user = Guid.NewGuid();

            var result = await controller.GetMyPendent(user);

            Assert.IsType<BadRequestObjectResult>(result.Result);  
        }

        [Fact]
        public async Task Update_NotFound()
        {
            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);
            var introductionRequest = Guid.NewGuid();
            string change = "accept";

            var result = await controller.Update(introductionRequest,change);

            Assert.IsType<NotFoundResult>(result.Result);  
        }

        [Fact]
        public async Task CreateInvalidIntroductionRequest_NoIntermediateConnection()
        {
            //Arrange
            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);

            var introductionUser = CreateIntroductionUser().Convert();
            var intermediateUser = CreateIntermediateUser().Convert();
            var targetUser = CreateTargetUser().Convert();

            var dto = CreateIntroductionRequest(targetUser,intermediateUser,introductionUser);

            var result = await controller.Create(dto);

             //Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);  
            
        }

       /*  [Fact]
        public async Task CreateInvalidIntroductionRequest_NoIntermediateConnection2()
        {
            //Arrange
            var service3 = new UserService(_unitOfWork.Object,_repoUser.Object,_repoUserProfile.Object, _repoTagCloud.Object,_repoTag.Object);
            
            var introductionUserDto = CreateIntroductionUser();
            var add1= await service3.AddAsync(introductionUserDto);
            var intermediateUserDto = CreateIntermediateUser();
            var add2 = await service3.AddAsync(intermediateUserDto);
            var targetUserDto = CreateTargetUser();
           var add3=  await service3.AddAsync(targetUserDto);
            
            var service2 = new ConnectionsService(_unitOfWork.Object,_repoConnection.Object,_repoUser.Object);

            var introductionUser = introductionUserDto.Convert();
            var intermediateUser = intermediateUserDto.Convert();
            var targetUser = targetUserDto.Convert();

            var connection = CreateConnection(introductionUser,intermediateUser);
            await service2.AddAsync(connection);

            var service = new IntroductionRequestService(_unitOfWork.Object, _repoIntroductionRequest.Object, _repoUser.Object, _repoConnectionRequest.Object, _repoConnection.Object);

            var controller = new IntroductionRequestsController(service);
            var dto = CreateIntroductionRequest(targetUser,intermediateUser,targetUser);

            var result = await controller.Create(dto);

             //Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);  
            
        } */


        private CreateConnectionDto CreateConnection(User user1, User user2) {
            

            var dto = new CreateConnectionDto {
                UserId1 = user1.Id.AsGuid(),
                UserId2 = user2.Id.AsGuid(),
                Strength1 = 2,
                Strength2 = 3
            };

            return dto;

        }
        private CreateIntroductionRequestDto CreateIntroductionRequest(User targetUser, User intermediateUser, User introductionUser) {
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
    
    }

}