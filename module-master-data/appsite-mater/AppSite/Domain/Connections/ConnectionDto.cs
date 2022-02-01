using System;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;
using AppSite.Domain.Tags;

namespace AppSite.Domain.Connections
{
    public record ConnectionDto : IDto<Connection>
    {
        public Guid Id { get; set; }
        public Guid UserId1 { get; set; }
        public Guid UserId2 { get; set; }
        public int Strength1 { get; set; }
        public int Strength2 { get; set; }
        public int BondValue { get; set; }

        public TagCloudDto ConnectionTagCloud { get; set; }

        public Connection Convert()
        {
            return new Connection(
                new ConnectionId(Id),
                new UserId(UserId1),
                new UserId(UserId2),
                new RelationshipStrength(Strength1),
                new RelationshipStrength(Strength2),
                new BondValue(BondValue)
            );
        }
    }
}