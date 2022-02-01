using AppSite.Domain.IntroductionRequests;
using AppSite.Infrastructure.Shared;
using AppSite.Domain.Users;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace AppSite.Infrastructure.IntroductionRequests
{
    public class IntroductionRequestRepository : BaseRepository<IntroductionRequest, IntroductionRequestId>,
        IIntroductionRequestRepository
    {
        private readonly AppSiteContext _context;

        public IntroductionRequestRepository(AppSiteContext context) : base(context.IntroductionRequests)
        {
            this._context = context;
        }

        public async Task<List<IntroductionRequest>> GetAllIntroductionRequests()
        {
            return await this._context.IntroductionRequests.Include(u => u.targetUser).Include(u => u.intermediateUser)
                .Include(u => u.introductionUser).ToListAsync();
        }

        public async Task<IntroductionRequest> GetIntroductionRequestById(IntroductionRequestId id)
        {
            return await this._context.IntroductionRequests.Include(u => u.targetUser).Include(u => u.intermediateUser)
                .Include(u => u.introductionUser).Where(x => id.Equals(x.Id)).FirstOrDefaultAsync();
        }

        public async Task<List<IntroductionRequest>> GetIntroductionRequestsByIntroductionUser(UserId userId)
        {
            return await this._context.IntroductionRequests.Include(u => u.targetUser).Include(u => u.intermediateUser)
                .Include(u => u.introductionUser).Where(x => userId.Equals(x.introductionUser.Id)).ToListAsync();
        }

        public async Task<List<IntroductionRequest>> GetAllPendentIntroductionRequests()
        {
            return await this._context.IntroductionRequests.Include(u => u.targetUser).Include(u => u.intermediateUser)
                .Include(u => u.introductionUser).Where(x => (x.introductionState).Equals(IntroductionState.pendent))
                .ToListAsync();
        }

        public async Task<List<IntroductionRequest>> GetMyPendentIntroductionRequests(UserId userId)
        {
            return await this._context.IntroductionRequests.Include(u => u.targetUser).Include(u => u.intermediateUser)
                .Include(u => u.introductionUser).Where(x =>
                    ((x.introductionState).Equals(IntroductionState.pendent)) && (userId.Equals(x.intermediateUser.Id)))
                .ToListAsync();
        }
    }
}