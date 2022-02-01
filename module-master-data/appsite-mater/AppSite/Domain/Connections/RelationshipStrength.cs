using System;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Connections
{
    // public class RelationshipStrengthId : EntityId {
    //     
    // }
    public record RelationshipStrength : IValueObject //Entity<RelationshipStrengthId>
    {
        // MIN <= value <= MAX
        public static readonly int MAX = 100;
        public static readonly int MIN = 0;

        private void Validate(int value)
        {
            if (value < MIN || value > MAX)
            {
                throw new BusinessRuleValidationException($"RelationshipStrength: value out of bounds ({value})");
            }
        }

        public int Value { get; private set; }

        public RelationshipStrength(int value)
        {
            Validate(value);
            this.Value = value;
        }
    }
}