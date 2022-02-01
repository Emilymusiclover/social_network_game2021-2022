using System;
using System.ComponentModel.DataAnnotations;
using AppSite.Domain.EmotionalStates;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Users
{
    public class UserDto : IDto<User>
    {
        public Guid Id { get; set; }
        [Required] [EmailAddress] public string UserEmail { get; set; }
        [Required] public string UserPassword { get; set; }
        public UserProfileDto UserProfile { get; set; }
        public string EmotionalState { get; set; }

        public UserDto()
        {
        }

        public UserDto(string email, string password)
        {
            Id = new Guid(); // fix me
            UserEmail = email;
        }

        public UserDto(Guid id, string email, string password)
        {
            Id = id;
            UserEmail = email;
            UserPassword = PasswordHash.Hash(password);
        }

        public UserDto(Guid id, string email, string password, UserProfileDto profile)
        {
            Id = id;
            UserEmail = email;
            UserPassword = PasswordHash.Hash(password);
            UserProfile = profile;
        }

        public UserDto(Guid id, string email, string password, string emotionalState, UserProfileDto profile)
        {
            Id = id;
            UserEmail = email;
            UserPassword = PasswordHash.Hash(password);
            UserProfile = profile;
            EmotionalState = emotionalState;
        }

        public User Convert()
        {
            var email = Email.ValueOf(UserEmail);
            var password = Password.ValueOf(UserPassword);
            var emotionalState = (EmotionalState) Enum.Parse(typeof(EmotionalState), EmotionalState);
            return new User(email, password, emotionalState, UserProfile.Convert());
        }
    }
}