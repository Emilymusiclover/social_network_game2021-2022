using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Users
{
    public class BriefDescription : IValueObject
    {
        public string UserDescription { get; set; }

        public BriefDescription()
        {
        }

        public BriefDescription(string description)
        {
            this.UserDescription = description;
        }


        public static BriefDescription ValueOf(string description)
        {
            return new BriefDescription(description);
        }
    }
}