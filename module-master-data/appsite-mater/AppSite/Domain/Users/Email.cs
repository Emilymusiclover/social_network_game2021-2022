using System;
using AppSite.Domain.Shared;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.Users
{
    public class Email : IValueObject
    {
        public string EmailString { get; set; }

        [JsonConstructor]
        public Email()
        {
        }

        public Email(string email)
        {
            this.EmailString = email;
        }

        public static Email ValueOf(string email)
        {
            return new Email(email);
        }
    }
}