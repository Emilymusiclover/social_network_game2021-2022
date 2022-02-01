using AppSite.Domain.Shared;
using AppSite.Domain.Users;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace AppSite.Domain.IntroductionRequests
{
    public interface IIntroductionRequestRepository : IRepository<IntroductionRequest, IntroductionRequestId>
    {
        Task<List<IntroductionRequest>> GetAllIntroductionRequests();

        Task<IntroductionRequest> GetIntroductionRequestById(IntroductionRequestId id);

        Task<List<IntroductionRequest>> GetIntroductionRequestsByIntroductionUser(UserId userId);

        Task<List<IntroductionRequest>> GetAllPendentIntroductionRequests();

        Task<List<IntroductionRequest>> GetMyPendentIntroductionRequests(UserId userId);
    }
}