using AppSite.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using AppSite.Domain.Tags;

namespace AppSite.Domain.Users
{
    public interface IUserRepository : IRepository<User, UserId>
    {
        Task<User> Authenticate(string username, string password);
        Task<List<User>> GetAllUsers();

        Task<User> GetUserByEmail(string email);

        Task<UserProfile> GetUserProfileByUserId(Guid id);

        Task<User> GetUserByUserId(Guid id);

        Task<TagCloud> GetTagCloudByUserId(Guid id);

        Task<List<User>> GetUsersByIds(List<Guid> ids);
    }
}