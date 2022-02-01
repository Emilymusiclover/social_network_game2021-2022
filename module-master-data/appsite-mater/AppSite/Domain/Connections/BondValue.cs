using AppSite.Domain.Shared;

namespace AppSite.Domain.Connections
{
    public record BondValue : IValueObject
    {
        // MIN <= value <= MAX
        public const int Max = 100;
        public const int Min = 1;

        private static void Validate(int value)
        {
            if (value < Min || value > Max)
                throw new BusinessRuleValidationException($"BondValue: value out of bounds ({value})");
        }

        public int Value { get; private set; }

        public BondValue(int value)
        {
            Validate(value);
            Value = value;
        }
    }
}