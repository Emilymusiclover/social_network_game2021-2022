using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Users
{
    public class Residency : IValueObject
    {
        public string UserCountry { get; set; }

        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "Must be aplhanumeric!")]
        public string UserCity { get; set; }

        public Residency()
        {
        }

        public Residency(string country, string city)
        {
            this.UserCountry = country;
            this.UserCity = city;
        }


        public static Residency ValueOf(string country, string city)
        {
            return new Residency(country, city);
        }
    }
}