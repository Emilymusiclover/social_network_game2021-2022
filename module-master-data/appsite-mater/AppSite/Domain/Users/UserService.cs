using System.Collections.Generic;
using System.Threading.Tasks;
using AppSite.Domain.Shared;
using AppSite.Domain.Tags;

namespace AppSite.Domain.Users
{
    public class UserService
    {
        private static bool CheckPassword(string password, string actualPassword)
        {
            return PasswordHash.VerifyHashedPassword(actualPassword, password);
        }

        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;
        private readonly IUserProfileRepository _repoProfile;
        private readonly ITagCloudRepository _repoTagCloud;
        private readonly ITagRepository _repoTag;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo, IUserProfileRepository repoProfile,
            ITagCloudRepository repoTagCloud, ITagRepository repoTag)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
            _repoProfile = repoProfile;
            _repoTagCloud = repoTagCloud;
            _repoTag = repoTag;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var list = await _repo.GetAllUsers();
            var listDto = list.ConvertAll(u => u.AsDto());
            return listDto;
        }

        public async Task<UserDto> GetByIdAsync(UserId id)
        {
            var user = await _repo.GetUserByUserId(id.AsGuid());

            if (user == null)
                throw new BusinessRuleValidationException("Invalid operation");

            return user.AsDto();
        }

        public async Task<List<UserDto>> GetByIds(List<UserId> ids)
        {
            var listIds = ids.ConvertAll(u => u.AsGuid());
            List<User> userList = await _repo.GetUsersByIds(listIds);

            if (userList == null)
                throw new BusinessRuleValidationException("Invalid operation");

            var listDto = userList.ConvertAll(u => u.AsDto());
            return listDto;
        }

        public async Task<UserDto> AddAsync(RegisterUserDto dto)
        {
            await CheckUserExists(dto.UserEmail);
            var userProfile = dto.UserProfile.Convert();

            var user = dto.Convert();
            await _repo.AddAsync(user);

            await _unitOfWork.CommitAsync();
            return user.AsDto();
        }


        public async Task<UserProfileDto> UpdateAsync(UserProfileDto dto)
        {
            var userProfile = await _repoProfile.GetByIdAsync(new UserProfileId(dto.Id));

            if (userProfile == null)
                return null;

            userProfile.ChangeProfileUserName(dto.ProfileUserName);
            userProfile.ChangeDescription(dto.UserDescription);
            userProfile.ChangePhoneNumber(dto.UserPhone);
            userProfile.ChangeResidency(dto.UserCountry, dto.UserCity);
            userProfile.ChangeTags(dto.UserTagCloud.Convert());


            await _unitOfWork.CommitAsync();
            return userProfile.AsDto();
        }

        private async Task<TagCloudDto> UpdateTags(TagCloud tagCloud)
        {
            await _unitOfWork.CommitAsync();

            return tagCloud.AsDto();
        }

        private async Task<TagCloudDto> DeleteTagAsync(TagCloudId id, TagId tagId)
        {
            var tagCloud = await _repoTagCloud.GetTagCloudById(id);

            if (tagCloud == null)
                return null;

            var tag = await _repoTag.GetByIdAsync(tagId);

            var tags = tagCloud.Tags;
            if (!tags.Contains(tag))
            {
                return null;
            }

            _repoTag.Remove(tag);
            await _unitOfWork.CommitAsync();

            return tagCloud.AsDto();
        }

        public async Task<UserProfileDto> GetUserProfileByIdAsync(UserId id)
        {
            var userProfile = await _repo.GetUserProfileByUserId(id.AsGuid());

            if (userProfile == null)
                return null;

            return userProfile.AsDto();
        }

        public async Task<TagCloudDto> GetTagCloudByUserId(UserId id)
        {
            var userTagCloud = await _repo.GetTagCloudByUserId(id.AsGuid());

            if (userTagCloud == null)
                return null;

            return userTagCloud.AsDto();
        }

        public async Task CheckUserExists(string email)
        {
            var user = await _repo.GetUserByEmail(email);
            if (user is not null)
            {
                throw new BusinessRuleValidationException("User already exists with that email");
            }
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _repo.GetUserByEmail(email);
            return user;
        }


        public async Task<UserDto> Authenticate(string email, string password)
        {
            var user = await _repo.Authenticate(email, password);

            var actualPassword = user.UserPassword.PasswordString;
            if (!CheckPassword(password, actualPassword))
            {
                throw new BusinessRuleValidationException("Invalid Password!");
            }

            return user?.AsDto();
        }
    }
}