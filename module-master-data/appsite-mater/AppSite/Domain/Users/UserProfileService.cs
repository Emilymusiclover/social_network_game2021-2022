using AppSite.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace AppSite.Domain.Users
{
    public class UserProfileService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IUserProfileRepository _repo;

        public UserProfileService(IUnitOfWork unitOfWork, IUserProfileRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<UserProfileDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<UserProfileDto> listDto = list.ConvertAll<UserProfileDto>(userProfile => userProfile.AsDto());

            return listDto;
        }

        public async Task<UserProfileDto> GetByIdAsync(UserProfileId id)
        {
            var userProfile = await this._repo.GetByIdAsync(id);

            if (userProfile == null)
                return null;

            return userProfile.AsDto();
        }

        public async Task<UserProfileDto> AddAsync(RegisterUserProfileDto dto)
        {
            var userProfile = dto.Convert();

            await this._repo.AddAsync(userProfile);

            await this._unitOfWork.CommitAsync();

            return userProfile.AsDto();
        }

        public async Task<UserProfileDto> UpdateAsync(UserProfileDto dto)
        {
            var userProfile = await this._repo.GetByIdAsync(new UserProfileId(dto.Id));

            if (userProfile == null)
                return null;

            if (!String.IsNullOrEmpty(dto.ProfileUserName))
            {
                userProfile.ChangeProfileUserName(dto.ProfileUserName);
            }

            if (!String.IsNullOrEmpty(dto.UserDescription))
            {
                userProfile.ChangeDescription(dto.UserDescription);
            }

            if (!String.IsNullOrEmpty(dto.UserPhone))
            {
                userProfile.ChangePhoneNumber(dto.UserPhone);
            }

            if (!String.IsNullOrEmpty(dto.UserCountry) && !String.IsNullOrEmpty(dto.UserCountry))
            {
                userProfile.ChangeResidency(dto.UserCountry, dto.UserCity);
            }
            else if (!String.IsNullOrEmpty(dto.UserCountry))
            {
                userProfile.ChangeCountry(dto.UserCountry);
            }
            else if (!String.IsNullOrEmpty(dto.UserCity))
            {
                userProfile.ChangeCity(dto.UserCity);
            }


            await this._unitOfWork.CommitAsync();

            return userProfile.AsDto();
        }
    }
}