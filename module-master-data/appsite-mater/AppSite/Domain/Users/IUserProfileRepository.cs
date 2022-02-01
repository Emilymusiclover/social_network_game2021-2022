using AppSite.Domain.Shared;

namespace AppSite.Domain.Users
{
    public interface IUserProfileRepository : IRepository<UserProfile, UserProfileId>
    {
    }
}