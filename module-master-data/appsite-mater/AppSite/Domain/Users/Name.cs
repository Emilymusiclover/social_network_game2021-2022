using AppSite.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.Users
{
    public class Name : IValueObject
    {
        public string ProfileName { get; set; }

        public Name()
        {
        }

        public Name(string name)
        {
            this.ProfileName = name;
        }


        public static Name ValueOf(string name)
        {
            return new Name(name);
        }
    }
}