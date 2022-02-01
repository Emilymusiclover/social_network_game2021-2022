using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppSite.Domain.ConnectionRequests;
using AppSite.Domain.Connections;
using AppSite.Domain.Users;
using AppSite.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace AppSite.Infrastructure.Connections
{
    public class ConnectionRepository : BaseRepository<Connection, ConnectionId>, IConnectionRepository
    {
        private readonly AppSiteContext _context;

        public ConnectionRepository(AppSiteContext context) : base(context.Connections)
        {
            _context = context;
        }

        public async Task<Connection> GetConnectionByUsers(UserId userId1, UserId userId2)
        {
            return await _context.Connections.Where(x =>
                (userId1.Equals(x.UserId1) && userId2.Equals(x.UserId2)) ||
                (userId1.Equals(x.UserId2) && userId2.Equals(x.UserId1))
            ).FirstOrDefaultAsync();
        }

        public async Task<List<Connection>> GetUserConnections(UserId userId)
        {
            return await _context.Connections
                .Where(x => userId.Equals(x.UserId1) || userId.Equals(x.UserId2)).ToListAsync();
        }

        public async Task<List<User>> GetUserFriends(UserId userId)
        {
            var connections1 = await _context.Connections
                .Where(x => userId.Equals(x.UserId1)).ToListAsync();
            var connections2 = await _context.Connections
                .Where(x => userId.Equals(x.UserId2)).ToListAsync();

            var userIds = new HashSet<UserId>();
            connections1.ForEach(conn1 => userIds.Add(conn1.UserId2));
            connections2.ForEach(conn2 => userIds.Add(conn2.UserId1));
            return await _context.Users.Where(x => userIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<List<User>> GetCommonFriends(UserId userId1, UserId userId2)
        {
            var listFriends1 = await GetUserFriends(userId1);
            var listFriends2 = await GetUserFriends(userId2);
            return listFriends1.Where(u1 => listFriends2.Contains(u1)).ToList();
        }

        public async Task<Connection> GetConnectionById(ConnectionId connectionId)
        {
            var connection = await _context.Connections.Where(u => u.Id.Equals(connectionId))
                .Include(c => c.ConnectionTagCloud).FirstOrDefaultAsync();
            return connection;
        }

        public async Task<List<User>> GetFriendsToBe(UserId userId)
        {
            // get all users
            var users = await _context.Users
                .Include(u => u.UserProfile)
                .Include(u => u.UserProfile.UserTagCloud)
                .Include(u => u.UserProfile.UserTagCloud.Tags)
                .Where(u => !u.Id.Equals(userId))
                .ToListAsync();
            var requests = await _context.ConnectionRequests
                .Include(u => u.UserSent)
                .Where(x => x.ConnectionState.Equals(ConnectionState.pendent) && userId.Equals(x.UserSent.Id))
                .ToListAsync();
            var pendent = requests.ConvertAll(req => req.UserReceive);

            return users.Except(await GetUserFriends(userId)).Except(pendent).ToList();
        }
    }
}