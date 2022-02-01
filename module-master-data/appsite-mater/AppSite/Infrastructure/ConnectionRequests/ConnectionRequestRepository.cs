using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppSite.Domain.ConnectionRequests;
using AppSite.Domain.Users;
using AppSite.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace AppSite.Infrastructure.ConnectionRequests
{
    public class ConnectionRequestRepository : BaseRepository<ConnectionRequest, ConnectionRequestId>,
        IConnectionRequestRepository
    {
        private readonly AppSiteContext _context;

        public ConnectionRequestRepository(AppSiteContext context) : base(context.ConnectionRequests)
        {
            _context = context;
        }

        public async Task<List<ConnectionRequest>> GetAllConnectionRequests()
        {
            return await _context.ConnectionRequests.Include(u => u.UserSent).Include(u => u.UserReceive)
                .ToListAsync();
        }

        public async Task<ConnectionRequest> GetConnectionRequestById(ConnectionRequestId id)
        {
            return await _context.ConnectionRequests.Include(u => u.UserSent).Include(u => u.UserReceive)
                .Where(x => id.Equals(x.Id)).FirstOrDefaultAsync();
        }

        public async Task<ConnectionRequest> GetConnectionRequestByUserIds(UserId userSentId, UserId userReceivedId)
        {
            return await _context.ConnectionRequests.Include(u => u.UserSent)
                .Include(u => u.UserReceive)
                .Where(x => userSentId.Equals(x.UserSent.Id))
                .Where(x => userReceivedId.Equals(x.UserReceive.Id))
                .FirstOrDefaultAsync();
        }

        public async Task<List<ConnectionRequest>> GetAllPendentConnectionRequests()
        {
            return await _context.ConnectionRequests.Include(u => u.UserSent).Include(u => u.UserReceive)
                .Where(x => (x.ConnectionState).Equals(ConnectionState.pendent)).ToListAsync();
        }

        public async Task<List<ConnectionRequest>> GetMyPendentConnectionRequests(UserId userId)
        {
            return await _context.ConnectionRequests.Include(u => u.UserSent).Where(x =>
                    ((x.ConnectionState).Equals(ConnectionState.pendent)) && (userId.Equals(x.UserReceive.Id)))
                .ToListAsync();
        }

        public async Task<List<ConnectionRequest>> GetMySentConnectionRequests(UserId userId)
        {
            return await _context.ConnectionRequests.Include(u => u.UserSent).Where(x =>
                    x.ConnectionState.Equals(ConnectionState.pendent)
                    && userId.Equals(x.UserSent.Id))
                .ToListAsync();
        }
    }
}