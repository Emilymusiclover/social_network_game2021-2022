using System.ComponentModel.DataAnnotations;
using System;

namespace AppSite.Domain.Users
{
    public class Min16Years : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var birthDate = (RegisterUserProfileDto) validationContext.ObjectInstance;

            if (birthDate == null)
                return new ValidationResult("Date of Birth is required.");

            var age = DateTime.Today.Year - birthDate.UserBirthDate.Year;

            return (age >= 16)
                ? ValidationResult.Success
                : new ValidationResult("User should be at least 16 years old to access.");
        }
    }
}