using AppSite.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace AppSite.Domain.Users
{
    public class Password : IValueObject
    {
        public string PasswordString { get; set; }


        public Password()
        {
        }

        public Password(string password)
        {
            IsValid(password);
            this.PasswordString = PasswordHash.Hash(password);
        }


        public static Password ValueOf(string password)
        {
            return new Password(password);
        }

        private static void IsValid(string password)
        {
            if (password == null)
                throw new BusinessRuleValidationException("Password is required.");

            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimum8Chars = new Regex(@".{8,}");
            bool isValid = hasUpperChar.IsMatch(password) && hasMinimum8Chars.IsMatch(password);
            if (!isValid)
                throw new BusinessRuleValidationException(
                    "Invalid Password. Must be at least 8 characters long and contain one UpperCase and one special character!");
        }
    }

    /**       public class ValidatePassword:ValidationAttribute{

      
       protected override ValidationResult IsValid(object value, ValidationContext validationContext)  
  {  
      var password = (RegisterUserDto)validationContext.ObjectInstance;  

      if( password == null)  
          return new ValidationResult("Password is required.");  

      var hasUpperChar = new Regex(@"[A-Z]+");
      var hasMinimum8Chars = new Regex(@".{8,}");
      bool isValid=hasUpperChar.IsMatch(password.UserPassword) && hasMinimum8Chars.IsMatch(password.UserPassword);
      return (isValid )  
          ? ValidationResult.Success  
          : new ValidationResult("Invalid Password. Must be at least 8 characters long and contain one UpperCase and one special character!");  
  }  
}  */
}