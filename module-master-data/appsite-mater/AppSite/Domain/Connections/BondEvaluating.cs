using System;
using AppSite.Domain.Users;

namespace AppSite.Domain.Connections
{
    public static class BondEvaluating
    {
        public static BondValue Evaluate(UserId u1, UserId u2)
        {
            return new BondValue(Random());
        }

        private static int Random()
        {
            var rand = new Random();
            return rand.Next(BondValue.Min, BondValue.Max);
        }
    }
}