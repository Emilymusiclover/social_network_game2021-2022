using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AppSite.Domain.Connections;
using AppSite.Domain.IntroductionRequests;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;

namespace AppSite.Domain.ConnectionRequests
{
    public class ConnectionRequestService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IConnectionRequestRepository _repo;

        private readonly IUserRepository _repoUser;

        private readonly IConnectionRepository _repoConnection;

        public ConnectionRequestService(IUnitOfWork unitOfWork, IConnectionRequestRepository repo,
            IUserRepository repoUser, IConnectionRepository repoConnection)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
            _repoUser = repoUser;
            _repoConnection = repoConnection;
        }

        public async Task<List<ConnectionRequestDto>> GetAllAsync()
        {
            var list = await _repo.GetAllConnectionRequests();

            if (list == null)
            {
                throw new BusinessRuleValidationException("No Connection Requests");
            }

            List<ConnectionRequestDto> listDto = list.ConvertAll(u =>
                u.AsDto());

            return listDto;
        }

        public async Task<ConnectionRequestDto> GetByIdAsync(ConnectionRequestId id)
        {
            var conn = await _repo.GetConnectionRequestById(id);

            if (conn == null)
                return null;

            return conn.AsDto();
        }

        public async Task<List<ConnectionRequestDto>> GetAllPendentAsync()
        {
            var list = await _repo.GetAllPendentConnectionRequests();

            if (list == null)
            {
                throw new BusinessRuleValidationException("No Pendent Connection Requests");
            }

            List<ConnectionRequestDto> listDto = list.ConvertAll(u =>
                u.AsDto());

            return listDto;
        }

        public async Task<List<ConnectionRequestDto>> GetMyPendentAsync(UserId userId)
        {
            var list = await _repo.GetMyPendentConnectionRequests(userId);

            if (list == null)
            {
                throw new BusinessRuleValidationException("No Pendent Connection Requests");
            }

            List<ConnectionRequestDto> listDto = list.ConvertAll(u =>
                u.AsDto());

            return listDto;
        }


        public async Task<ConnectionRequestDto> AddAsync(CreateConnectionRequestDto dto)
        {
            var userSent = _repoUser.GetByIdAsync(new UserId(dto.UserSent)).Result;
            var userReceive = _repoUser.GetByIdAsync(new UserId(dto.UserReceive)).Result;

            if (userSent == null || userReceive == null)
            {
                throw new BusinessRuleValidationException("User not found");
            }

            if (await _repo.GetConnectionRequestByUserIds(userSent.Id, userReceive.Id) != null)
            {
                throw new BusinessRuleValidationException("Connection Request already exists");
            }

            var connectionText = new ConnectionText(dto.ConnectionText);
            var connectionRequest =
                new ConnectionRequest(ConnectionState.pendent, userSent, userReceive, connectionText);

            await _repo.AddAsync(connectionRequest);

            await _unitOfWork.CommitAsync();

            return connectionRequest.AsDto();
        }

        public async Task<ConnectionRequestDto> UpdateAsync(Guid connectionRequestId, string update)
        {
            var connectionRequest =
                await _repo.GetConnectionRequestById(new ConnectionRequestId(connectionRequestId));

            if (connectionRequest == null)
                return null;

            // change all field

            connectionRequest.ChangeState(update);


            if (update.Equals("accepted"))
            {
                UserId targetUser = new UserId(connectionRequest.UserSent.AsDto().Id);
                UserId intermediateUser = new UserId(connectionRequest.UserReceive.AsDto().Id);

                var connection = new Connection(targetUser, intermediateUser, new RelationshipStrength(1),
                    new RelationshipStrength(1));
                await AddConnection(connection);
            }

            await _unitOfWork.CommitAsync();

            return connectionRequest.AsDto();
        }

        private async Task<Connection> AddConnection(Connection connection)
        {
            await _repoConnection.AddAsync(connection);

            await _unitOfWork.CommitAsync();

            return connection;
        }
    }
}