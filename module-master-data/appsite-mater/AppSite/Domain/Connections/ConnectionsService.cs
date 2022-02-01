using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppSite.Domain.Shared;
using AppSite.Domain.Tags;
using AppSite.Domain.Users;

namespace AppSite.Domain.Connections
{
    public class ConnectionsService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConnectionRepository _repo;
        private readonly IUserRepository _userRepo;

        public ConnectionsService(IUnitOfWork unitOfWork, IConnectionRepository repo, IUserRepository userRepo)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
            _userRepo = userRepo;
        }

        public async Task<List<ConnectionDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list?.ConvertAll(conn => conn.AsDto());
        }

        public async Task<ConnectionDto> GetByIdAsync(ConnectionId id)
        {
            var conn = await _repo.GetByIdAsync(id);
            return conn?.AsDto();
        }

        public async Task<ConnectionDto> GetConnectionByUsers(UserId userId1, UserId userId2)
        {
            var conn = await _repo.GetConnectionByUsers(userId1, userId2);
            return conn?.AsDto();
        }

        public async Task<List<UserDto>> GetFriends(UserId userId)
        {
            var list = await _repo.GetUserFriends(userId);
            return list?.ConvertAll(user => user.AsDto());
        }

        public async Task<List<UserDto>> GetCommonFriends(UserId userId1, UserId userId2)
        {
            var list = await _repo.GetCommonFriends(userId1, userId2);
            return list?.ConvertAll(user => user.AsDto());
        }

        public async Task<List<UserDto>> GetFriendsToBe(UserId userId1)
        {
            var list = await _repo.GetFriendsToBe(userId1);
            return list?.ConvertAll(user => user.AsDto());
        }

        public async Task<ConnectionDto> AddAsync(CreateConnectionDto dto)
        {
            // convert guid to user ids
            var userId1 = new UserId(dto.UserId1);
            var userId2 = new UserId(dto.UserId2);

            // verify users exist
            var user1 = _userRepo.GetByIdAsync(userId1).Result;
            var user2 = _userRepo.GetByIdAsync(userId2).Result;

            if (user1 == null || user2 == null)
                throw new BusinessRuleValidationException("Invalid Connection : User(s) Not Found");

            // verify connection does not exist
            var conn = _repo.GetConnectionByUsers(userId1, userId2).Result;
            if (conn != null)
                throw new BusinessRuleValidationException("Duplicate Connection");

            var connection = new Connection(
                userId1,
                userId2,
                new RelationshipStrength(dto.Strength1),
                new RelationshipStrength(dto.Strength2)
            );

            await _repo.AddAsync(connection);

            await _unitOfWork.CommitAsync();

            return connection.AsDto();
        }


        public async Task<ConnectionDto> AddAsync(CreateConnectionByEmailDto dto)
        {
            // get user ids by email
            var u1 = await _userRepo.GetUserByEmail(dto.UserEmail1);
            var u2 = await _userRepo.GetUserByEmail(dto.UserEmail2);
            if (u1 == null || u2 == null)
                throw new BusinessRuleValidationException("Invalid Connection : User(s) Not Found");
            // create new dto
            var createDto = new CreateConnectionDto
            {
                UserId1 = u1.Id.AsGuid(),
                UserId2 = u2.Id.AsGuid(),
                Strength1 = dto.Strength1,
                Strength2 = dto.Strength2
            };
            // add async with standard dto
            return await AddAsync(createDto);
        }

        public async Task<ConnectionDto> UpdateAsync(ConnectionDto dto)
        {
            var connection = await _repo.GetByIdAsync(new ConnectionId(dto.Id));

            if (connection == null)
                return null;

            if (!connection.UserId1.AsGuid().Equals(dto.UserId1) || !connection.UserId2.AsGuid().Equals(dto.UserId2))
            {
                throw new BusinessRuleValidationException(
                    "Invalid Connection : Conflicting Data (User(s) cannot be changed)");
            }

            // change all field
            connection.UpdateStrengths(dto.Strength1, dto.Strength2);

            await _unitOfWork.CommitAsync();

            return connection.AsDto();
        }

        public async Task<TagCloudDto> UpdateConnectionTagCloud(TagCloudDto dto, ConnectionId id)
        {
            var connection = await _repo.GetConnectionById(id);
            //var tagCloud = await _tagRepo.GetTagCloudById(new TagCloudId(dto.Id));
            var connectionTagCloud = connection.ConnectionTagCloud;
            if (connectionTagCloud == null)
            {
                return null;
            }

            connection.UpdateTagCloud(connectionTagCloud);
            await _unitOfWork.CommitAsync();

            return connectionTagCloud.AsDto();
        }

        public async Task<ConnectionDto> DeleteAsync(ConnectionId id)
        {
            var connection = await _repo.GetByIdAsync(id);

            if (connection == null)
                return null;

            _repo.Remove(connection);
            await _unitOfWork.CommitAsync();

            return connection.AsDto();
        }
    }
}