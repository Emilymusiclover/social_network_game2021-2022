using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppSite.Domain.Tags;
using AppSite.Domain.Users;
using AppSite.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace AppSite.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>, IUserRepository
    {
        private readonly AppSiteContext _context;

        public UserRepository(AppSiteContext context) : base(context.Users)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.Include(u => u.UserProfile).Include(u => u.UserProfile.UserTagCloud)
                .Include(u => u.UserProfile.UserTagCloud.Tags)
                .ToListAsync();
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var userEmail = Email.ValueOf(email);

            return await _context.Users.Where(u => u.UserEmail.EmailString == (userEmail.EmailString))
                .Include(u => u.UserProfile).Include(u => u.UserProfile.UserTagCloud.Tags).FirstOrDefaultAsync();
        }

        public async Task<UserProfile> GetUserProfileByUserId(Guid id)
        {
            var user = await _context.Users.Where(u => u.Id.Equals(new UserId(id))).Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud.Tags).FirstOrDefaultAsync();
            return user.UserProfile;
        }

        public async Task<TagCloud> GetTagCloudByUserId(Guid id)
        {
            var user = await _context.Users.Where(u => u.Id.Equals(new UserId(id))).Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud.Tags).FirstOrDefaultAsync();
            return user?.UserProfile?.UserTagCloud;
        }

        public async Task<User> GetUserByUserId(Guid id)
        {
            var user = await _context.Users.Where(u => u.Id.Equals(new UserId(id))).Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud.Tags).Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud.Tags).FirstOrDefaultAsync();
            return user;
        }

        public async Task<List<User>> GetUsersByIds(List<Guid> ids)
        {
            var listIds = ids.ConvertAll(id => new UserId(id));

            var user = await _context.Users.Where(u => listIds.Contains(u.Id)).Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud.Tags).Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud.Tags).ToListAsync();
            return user;
        }


        public async Task<User> Authenticate(string email, string password)
        {
            var userEmail = Email.ValueOf(email);
            var userPassword = Password.ValueOf(password);

            var user = await _context.Users.Where(x => x.UserEmail.EmailString == userEmail.EmailString)
                .Include(u => u.UserProfile).Include(u => u.UserProfile.UserTagCloud.Tags).Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud.Tags).FirstOrDefaultAsync();

            // authentication successful so return user details
            return user;
        }
    }
}