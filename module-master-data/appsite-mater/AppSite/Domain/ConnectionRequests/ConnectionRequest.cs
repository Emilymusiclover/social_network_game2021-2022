using System;
using System.Collections.Generic;
using AppSite.Domain.IntroductionRequests;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;

namespace AppSite.Domain.ConnectionRequests
{
    public class ConnectionRequest : Entity<ConnectionRequestId>, IAggregateRoot
    {
        public ConnectionState ConnectionState { get; set; }
        public ConnectionText ConnectionText { get; set; }
        public User UserSent { get; set; }
        public User UserReceive { get; set; }

        private ConnectionRequest()
        {
        }

        public ConnectionRequest(
            ConnectionState connectionState,
            User userSent,
            User userReceive,
            ConnectionText connectionText
        )
        {
            Id = new ConnectionRequestId(Guid.NewGuid());
            ConnectionState = connectionState;
            UserSent = userSent;
            UserReceive = userReceive;
            ConnectionText = connectionText;
        }

        public void ChangeState(string state)
        {
            if (state.Equals("accepted"))
            {
                ConnectionState = ConnectionState.accepted;
            }
            else if (state.Equals("rejected"))
            {
                ConnectionState = ConnectionState.rejected;
            }
        }

        public ConnectionRequestDto AsDto()
        {
            return new ConnectionRequestDto
            {
                Id = Id.AsGuid(),
                ConnectionRequestState = " " + ConnectionState,
                UserSentDto = UserSent?.AsDto(),
                UserReceiveDto = UserReceive?.AsDto(),
                ConnectionRequestText = ConnectionText.connectionText
            };
        }

        public override bool Equals(object obj)
        {
            return obj is ConnectionRequest connectionRequest &&
                   EqualityComparer<ConnectionRequestId>.Default.Equals(Id, connectionRequest.Id);
        }

        public override int GetHashCode()
        {
            int hashCode = -650675842;
            hashCode = hashCode * -1521134295 + EqualityComparer<User>.Default.GetHashCode(UserReceive);
            hashCode = hashCode * -1521134295 + EqualityComparer<User>.Default.GetHashCode(UserSent);
            return hashCode;
        }
    }
}