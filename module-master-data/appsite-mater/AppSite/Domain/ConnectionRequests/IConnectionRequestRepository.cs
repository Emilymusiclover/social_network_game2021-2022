using AppSite.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using AppSite.Domain.Users;

namespace AppSite.Domain.ConnectionRequests
{
    public interface IConnectionRequestRepository : IRepository<ConnectionRequest, ConnectionRequestId>
    {
        Task<List<ConnectionRequest>> GetAllConnectionRequests();

        Task<ConnectionRequest> GetConnectionRequestById(ConnectionRequestId id);
        Task<ConnectionRequest> GetConnectionRequestByUserIds(UserId userSentId, UserId userReceivedId);

        Task<List<ConnectionRequest>> GetAllPendentConnectionRequests();

        Task<List<ConnectionRequest>> GetMyPendentConnectionRequests(UserId userId);
    }
}