using System;
using System.Collections.Generic;
using AppSite.Domain.Shared;
using AppSite.Domain.Users;
using Newtonsoft.Json;
using AppSite.Domain.Tags;

namespace AppSite.Domain.Connections
{
    public class Connection : Entity<ConnectionId>, IAggregateRoot, IDtoable<ConnectionDto>
    {
        public UserId UserId1 { get; set; }
        public UserId UserId2 { get; set; }
        public RelationshipStrength Strength1 { get; private set; }
        public RelationshipStrength Strength2 { get; private set; }
        public BondValue BondValue { get; private set; }
        public TagCloud ConnectionTagCloud { get; set; }

        public Connection()
        {
            // fix me
            Id = new ConnectionId(Guid.NewGuid());
        }

        public Connection(ConnectionId id, UserId userId1, UserId userId2,
            RelationshipStrength strength1, RelationshipStrength strength2, BondValue bondValue)
        {
            if (id == null || userId1 == null || userId2 == null
                || strength1 == null || strength2 == null || bondValue == null)
            {
                throw new BusinessRuleValidationException("Values cannot be null");
            }

            Id = id;
            UserId1 = userId1;
            UserId2 = userId2;
            Strength1 = strength1;
            Strength2 = strength2;
            BondValue = bondValue;
            ConnectionTagCloud = new TagCloud();
        }

        public Connection(UserId userId1, UserId userId2, RelationshipStrength strength1,
            RelationshipStrength strength2)
        {
            if (userId1 == null || userId2 == null || strength1 == null || strength2 == null)
            {
                throw new BusinessRuleValidationException("Values cannot be null");
            }

            Id = new ConnectionId(Guid.NewGuid());
            UserId1 = userId1;
            UserId2 = userId2;
            Strength1 = strength1;
            Strength2 = strength2;
            BondValue = BondEvaluating.Evaluate(userId1, userId2);
            ConnectionTagCloud = new TagCloud();
        }

        public void UpdateStrengths(int strength1, int strength2)
        {
            if (strength1 >= 0) Strength1 = new RelationshipStrength(strength1);
            if (strength2 >= 0) Strength2 = new RelationshipStrength(strength2);
        }

        public void UpdateBondValue()
        {
            BondValue = BondEvaluating.Evaluate(UserId1, UserId2);
        }

        /*public void UpdateTagCloud(List<String> tags)
        {
            tags.ForEach(tag=>ConnectionTagCloud.Tags.Add(new Tag(TagName.ValueOf(tag))));
        }*/

        public void UpdateTagCloud(TagCloud tag)
        {
            ConnectionTagCloud = tag;
        }


        public ConnectionDto AsDto()
        {
            return new ConnectionDto
            {
                Id = Id.AsGuid(),
                UserId1 = UserId1.AsGuid(),
                UserId2 = UserId2.AsGuid(),
                Strength1 = Strength1.Value,
                Strength2 = Strength2.Value,
                BondValue = BondValue.Value,
            };
        }

        public override bool Equals(object obj)
        {
            return obj is Connection connection &&
                   EqualityComparer<ConnectionId>.Default.Equals(Id, connection.Id);
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}