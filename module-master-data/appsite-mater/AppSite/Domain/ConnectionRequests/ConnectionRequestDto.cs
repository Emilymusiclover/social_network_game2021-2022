using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Routing;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;
using AppSite.Domain.IntroductionRequests;

namespace AppSite.Domain.ConnectionRequests
{
    public class ConnectionRequestDto : IDto<ConnectionRequest>
    {
        public Guid Id { get; set; }
        [Required] public string ConnectionRequestState { get; set; }

        public UserDto UserSentDto { get; set; }
        public UserDto UserReceiveDto { get; set; }
        public string ConnectionRequestText { get; set; }

        public ConnectionRequestDto()
        {
        }

        public ConnectionRequestDto(Guid id, string ConnetionRequestState, UserDto UserSentDto, UserDto UserReceiveDto,
            string connectionText)
        {
            this.Id = id;
            this.ConnectionRequestState = ConnetionRequestState;
            this.UserSentDto = UserSentDto;
            this.UserReceiveDto = UserReceiveDto;
            this.ConnectionRequestText = connectionText;
        }

        public override bool Equals(object obj)
        {
            return obj is ConnectionRequestDto dto &&
                   Id.Equals(dto.Id);
        }

        public ConnectionRequest Convert()
        {
            ConnectionText connectionText = ConnectionText.ValueOf(ConnectionRequestText);
            ConnectionState connectionRequestState;
            if (ConnectionRequestState.Equals("accepted"))
            {
                connectionRequestState = ConnectionState.accepted;
            }
            else
            {
                if (ConnectionRequestState.Equals("pendent"))
                {
                    connectionRequestState = ConnectionState.pendent;
                }
                else
                {
                    connectionRequestState = ConnectionState.rejected;
                }
            }

            return new ConnectionRequest(connectionRequestState, UserSentDto.Convert(), UserReceiveDto.Convert(),
                connectionText);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}