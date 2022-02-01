using System;
using Newtonsoft.Json;
using AppSite.Domain.Tags;
using System.ComponentModel.DataAnnotations;


namespace AppSite.Domain.Users

{
    public class RegisterUserProfileDto
    {
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "Must be aplhanumeric and without space!"), Required]

        public string ProfileUserName { get; set; }

        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        [Required]
        [Min16Years]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime UserBirthDate { get; set; }

        public string UserCountry { get; set; }
        public string UserCity { get; set; }

        [MaxLength(4000)] public string UserDescription { get; set; }

        [RegularExpression(@"^\+(?:[0-9]●?){6,14}[0-9]$",
            ErrorMessage = "Must follow format + country code phone_number")]
        public string UserPhone { get; set; }

        public CreateTagCloudDto UserTagCloud { get; set; }

        public RegisterUserProfileDto()
        {
        }

        public RegisterUserProfileDto(string ProfileName, DateTime birthDate, string UserCountry, string UserCity,
            string UserDescription, string UserPhone, CreateTagCloudDto dto)
        {
            this.ProfileUserName = ProfileName;
            this.UserBirthDate = birthDate;
            this.UserCountry = UserCountry;
            this.UserCity = UserCity;
            this.UserDescription = UserDescription;
            this.UserPhone = UserPhone;
            this.UserTagCloud = dto;
        }


        public UserProfile Convert()
        {
            Name ProfileName = Name.ValueOf(ProfileUserName);
            BirthDate birthDate = BirthDate.ValueOf(UserBirthDate);
            Residency residency = Residency.ValueOf(UserCountry, UserCity);
            BriefDescription description = BriefDescription.ValueOf(UserDescription);
            PhoneNumber phoneNumber = PhoneNumber.ValueOf(UserPhone);
            TagCloud userCloud = UserTagCloud.Convert();

            return new UserProfile(ProfileName, birthDate, residency, description, phoneNumber, userCloud);
        }
    }
}