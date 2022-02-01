using System;
using AppSite.Domain.Shared;
using AppSite.Domain.Tags;

namespace AppSite.Domain.Users
{
    public class UserProfile : Entity<UserProfileId>, IDtoable<UserProfileDto>
    {
        public Name ProfileUserName { get; set; }
        public BirthDate UserBirthDate { get; set; }
        public Residency UserResidency { get; set; }
        public BriefDescription UserDescription { get; set; }
        public PhoneNumber UserPhone { get; set; }
        public TagCloud UserTagCloud { get; set; }

        public UserProfile()
        {
            Id = new UserProfileId(Guid.NewGuid());
            // ProfileUserName = Name.ValueOf("sample");
            // UserBirthDate = BirthDate.ValueOf(new DateTime(2001, 12, 31));
            // UserResidency = Residency.ValueOf("Portugal", "Porto");
            // UserDescription = BriefDescription.ValueOf("");
            // UserPhone = PhoneNumber.ValueOf("+351939456789");
            // UserTagCloud = new TagCloud();
        }

        public UserProfile(Name name, BirthDate date, Residency residency, BriefDescription description,
            PhoneNumber phone, TagCloud UserTags)
        {
            Id = new UserProfileId(Guid.NewGuid());
            ProfileUserName = name;
            UserBirthDate = date;
            UserResidency = residency;
            UserDescription = description;
            UserPhone = phone;
            UserTagCloud = UserTags;
        }

        public UserProfileDto AsDto()
        {
            return new UserProfileDto
            {
                Id = Id?.AsString(),
                ProfileUserName = ProfileUserName?.ProfileName,
                UserBirthDate = UserBirthDate?.UserBirthDate,
                UserCountry = UserResidency?.UserCountry,
                UserCity = UserResidency?.UserCity,
                UserDescription = UserDescription?.UserDescription,
                UserPhone = UserPhone?.UserPhone,
                UserTagCloud = UserTagCloud?.AsDto(),
            };
        }

        public void ChangeProfileUserName(string profileName)
        {
            ProfileUserName = Name.ValueOf(profileName);
        }

        public void ChangeResidency(string country, string city)
        {
            UserResidency = Residency.ValueOf(country, city);
        }

        public void ChangeCountry(string country)
        {
            UserResidency.UserCountry = country;
        }

        public void ChangeCity(string city)
        {
            UserResidency.UserCity = city;
        }

        public void ChangeDescription(string description)
        {
            UserDescription = BriefDescription.ValueOf(description);
        }

        public void ChangePhoneNumber(string phoneNumber)
        {
            UserPhone = PhoneNumber.ValueOf(phoneNumber);
        }

        public void ChangeTags(TagCloud tags)
        {
            UserTagCloud = tags;
        }
    }
}