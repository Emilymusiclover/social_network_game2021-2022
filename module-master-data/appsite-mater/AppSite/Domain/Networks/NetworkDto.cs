using System.Collections.Generic;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;

namespace AppSite.Domain.Networks
{
    public class NetworkDto
    {
        public Dictionary<UserDto, Vertex<UserDto>> Dictionary { get; set;  }
        
        public NetworkDto()
        {
            Dictionary = new Dictionary<UserDto, Vertex<UserDto>>();
        }
    }
}