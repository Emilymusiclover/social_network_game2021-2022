using AppSite.Domain.Users;
using AppSite.Infrastructure.Shared;

namespace AppSite.Infrastructure.Users
{
    public class UserProfileRepository : BaseRepository<UserProfile, UserProfileId>, IUserProfileRepository
    {
        public UserProfileRepository(AppSiteContext context) : base(context.UserProfile)
        {
        }
    }
}