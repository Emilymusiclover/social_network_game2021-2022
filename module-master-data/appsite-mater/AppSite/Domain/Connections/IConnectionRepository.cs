using AppSite.Domain.Shared;
using AppSite.Domain.Users;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace AppSite.Domain.Connections
{
    public interface IConnectionRepository : IRepository<Connection, ConnectionId>
    {
        Task<Connection> GetConnectionByUsers(UserId userId1, UserId userId2);
        Task<List<Connection>> GetUserConnections(UserId userId);
        Task<List<User>> GetUserFriends(UserId userId);
        Task<List<User>> GetCommonFriends(UserId userId1, UserId userId2);
        Task<Connection> GetConnectionById(ConnectionId connectionId);
        Task<List<User>> GetFriendsToBe(UserId userId);
    }
}