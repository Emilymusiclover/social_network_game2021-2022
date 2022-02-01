using AppSite.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System;
using Newtonsoft.Json;

namespace AppSite.Domain.Users
{
    public class BirthDate : IValueObject
    {
        public DateTime UserBirthDate { get; set; }

        public BirthDate()
        {
        }

        public BirthDate(DateTime? date)
        {
            UserBirthDate = date.GetValueOrDefault(DateTime.MinValue);
        }

        public static BirthDate ValueOf(DateTime? date)
        {
            return new BirthDate(date);
        }
    }
}