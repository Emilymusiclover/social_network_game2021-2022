using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Users
{
    public class PhoneNumber : IValueObject
    {
        public string UserPhone { get; set; }

        public PhoneNumber()
        {
        }

        public PhoneNumber(string UserPhone)
        {
            this.UserPhone = UserPhone;
        }

        public static PhoneNumber ValueOf(string phone)
        {
            return new PhoneNumber(phone);
        }
    }
}