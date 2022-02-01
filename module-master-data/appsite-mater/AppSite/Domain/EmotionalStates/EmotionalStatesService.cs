using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;
using AppSite.Infrastructure.Users;

namespace AppSite.Domain.EmotionalStates
{
    public class EmotionalStatesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _userRepo;

        public EmotionalStatesService(IUnitOfWork unitOfWork, IUserRepository userRepo)
        {
            this._unitOfWork = unitOfWork;
            this._userRepo = userRepo;
        }

        public async Task<EmotionalState> GetUserEmotionalStateAsync(UserId userId)
        {
            var user = await this._userRepo.GetUserByUserId(userId.AsGuid());

            if (user == null)
            {
                throw new BusinessRuleValidationException("User Not Found");
            }

            return user.EmotionalState;
        }

        internal async Task UpdateUserEmotionalStateAsync(UserId userId, string emotionalState)
        {
            var user = await this._userRepo.GetUserByUserId(userId.AsGuid());

            if (user == null)
            {
                throw new BusinessRuleValidationException("User Not Found");
            }

            user.UpdateEmotionalState((EmotionalState) Enum.Parse(typeof(EmotionalState), emotionalState));
            await this._unitOfWork.CommitAsync();
        }
    }
}