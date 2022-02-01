using AppSite.Domain.Shared;
using AppSite.Domain.Users;
using AppSite.Domain.ConnectionRequests;
using AppSite.Domain.Connections;
using System.Threading.Tasks;
using System.Collections.Generic;
using AppSite.Infrastructure.Users;
using System.Linq;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace AppSite.Domain.IntroductionRequests
{
    public class IntroductionRequestService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IIntroductionRequestRepository _repo;

        private readonly IUserRepository _repoUser;

        private readonly IConnectionRequestRepository _repoConnectionRequest;

        private readonly IConnectionRepository _repoConnection;

        public IntroductionRequestService(IUnitOfWork unitOfWork, IIntroductionRequestRepository repo,
            IUserRepository repoUser, IConnectionRequestRepository repoConnectionRequest,
            IConnectionRepository repoConnection)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoUser = repoUser;
            this._repoConnectionRequest = repoConnectionRequest;
            this._repoConnection = repoConnection;
        }

        public async Task<List<IntroductionRequestDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllIntroductionRequests();

            if (list == null)
            {
                throw new BusinessRuleValidationException("Invalid operation");
            }

            List<IntroductionRequestDto> listDto = list.ConvertAll<IntroductionRequestDto>(u =>
                u.AsDto());

            return listDto;
        }

        public async Task<IntroductionRequestDto> GetByIdAsync(IntroductionRequestId id)
        {
            var conn = await this._repo.GetIntroductionRequestById(id);

            if (conn == null)
                return null;

            return conn.AsDto();
        }

        public async Task<List<IntroductionRequestDto>> GetAllPendentAsync()
        {
            var list = await this._repo.GetAllPendentIntroductionRequests();

            if (list == null)
            {
                throw new BusinessRuleValidationException("No Pendent Introduction Requests");
            }

            List<IntroductionRequestDto> listDto = list.ConvertAll<IntroductionRequestDto>(u =>
                u.AsDto());

            return listDto;
        }

        public async Task<List<IntroductionRequestDto>> GetMyPendentAsync(UserId userId)
        {
            var list = await this._repo.GetMyPendentIntroductionRequests(userId);

            if (list == null)
            {
                throw new BusinessRuleValidationException("No Pendent Introduction Requests");
            }

            List<IntroductionRequestDto> listDto = list.ConvertAll<IntroductionRequestDto>(u =>
                u.AsDto());

            return listDto;
        }


        public async Task<List<IntroductionRequestDto>> GetByIntroUserIdAsync(UserId userId)
        {
            var list = await this._repo.GetIntroductionRequestsByIntroductionUser(userId);
            if (list == null)
            {
                throw new BusinessRuleValidationException("Invalid operation");
            }

            List<IntroductionRequestDto> listDto = list.ConvertAll<IntroductionRequestDto>(u => u.AsDto());

            return listDto;
        }

        public async Task<IntroductionRequestDto> AddAsync(CreateIntroductionRequestDto dto)
        {
            User targetUser = _repoUser.GetByIdAsync(new UserId(dto.targetUser)).Result;
            User intermediateUser = _repoUser.GetByIdAsync(new UserId(dto.intermediateUser)).Result;
            User introductionUser = _repoUser.GetByIdAsync(new UserId(dto.introductionUser)).Result;

            if (targetUser == null || intermediateUser == null || introductionUser == null)
            {
                throw new BusinessRuleValidationException("User not found");
            }

            // sees if intermediate user has a connection with introduction user
            var connection = await getConnection(introductionUser.Id, intermediateUser.Id);
            if (connection == null)
            {
                throw new BusinessRuleValidationException(
                    "Intermediate and introduction user connection doesn't exist");
            }

            // sees if intermediate user has a connection with target user
            var connection2 = await getConnection(targetUser.Id, intermediateUser.Id);
            if (connection2 == null)
            {
                throw new BusinessRuleValidationException("Intermediate and target user connection doesn't exist");
            }

            // sees if intermediate user has a connection with target user
            var connection3 = await getConnection(targetUser.Id, introductionUser.Id);
            if (connection3 != null)
            {
                throw new BusinessRuleValidationException("Introduction and target user are already friends");
            }

            IntroductionText introductionText = new IntroductionText(dto.introductionText);
            ConnectionText connectionText = new ConnectionText(dto.connectionText);

            var introductionRequest = new IntroductionRequest(IntroductionState.pendent, targetUser, intermediateUser,
                introductionUser, introductionText, connectionText);

            await this._repo.AddAsync(introductionRequest);

            await this._unitOfWork.CommitAsync();

            return introductionRequest.AsDto();
        }

        public async Task<Connection> getConnection(UserId userId1, UserId userId2)
        {
            var connection = await _repoConnection.GetConnectionByUsers(userId1, userId2);
            if (connection == null)
            {
                return null;
            }

            return connection;
        }

        public async Task<IntroductionRequestDto> UpdateAsync(Guid introductionRequestId, string update)
        {
            var introductionRequest =
                await this._repo.GetIntroductionRequestById(new IntroductionRequestId(introductionRequestId));

            if (introductionRequest == null)
                return null;

            // verifies if the state was already accepted or rejected and doesn't allow to update
            if ((introductionRequest.introductionState).Equals("accepted") ||
                (introductionRequest.introductionState).Equals("rejected"))
            {
                return null;
            }

            introductionRequest.changeState(update);

            if (update.Equals("accepted"))
            {
                var connectionRequest = new ConnectionRequest(ConnectionState.pendent,
                    introductionRequest.introductionUser, introductionRequest.targetUser,
                    introductionRequest.connectionText);
                Task<ConnectionRequestDto> task = this.AddConnectionRequest(connectionRequest);
            }

            await this._unitOfWork.CommitAsync();

            return introductionRequest.AsDto();
        }

        private async Task<ConnectionRequestDto> AddConnectionRequest(ConnectionRequest connectionRequest)
        {
            await this._repoConnectionRequest.AddAsync(connectionRequest);

            await this._unitOfWork.CommitAsync();

            return connectionRequest.AsDto();
        }
    }
}