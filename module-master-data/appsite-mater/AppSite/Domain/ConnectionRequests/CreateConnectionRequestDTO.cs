using System;

namespace AppSite.Domain.ConnectionRequests
{
    public class CreateConnectionRequestDto
    {
        public Guid UserSent { get; set; }
        public Guid UserReceive { get; set; }
        public string ConnectionText { get; set; }
    }
}