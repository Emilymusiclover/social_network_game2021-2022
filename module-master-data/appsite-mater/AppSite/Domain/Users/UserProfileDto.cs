using System;
using Newtonsoft.Json;
using AppSite.Domain.Shared;
using AppSite.Domain.Tags;
using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.Users

{
    public class UserProfileDto : IDto<UserProfile>
    {
        public string Id { get; set; }
        public string ProfileUserName { get; set; }

        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? UserBirthDate { get; set; }

        public string UserCountry { get; set; }
        public string UserCity { get; set; }
        public string UserDescription { get; set; }
        public string UserPhone { get; set; }
        public TagCloudDto UserTagCloud { get; set; }

        public UserProfileDto()
        {
        }

        public UserProfileDto(string id, string ProfileName, DateTime birthDate, string UserCountry, string UserCity,
            string UserDescription, string UserPhone, TagCloudDto UserTags)
        {
            this.Id = id;
            this.ProfileUserName = ProfileName;
            this.UserBirthDate = birthDate;
            this.UserCountry = UserCountry;
            this.UserCity = UserCity;
            this.UserDescription = UserDescription;
            this.UserPhone = UserPhone;
            this.UserTagCloud = UserTags;
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