using System.ComponentModel.DataAnnotations;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Users
{
    public class RegisterUserDto : IDto<User>
    {
        [Required] [EmailAddress] public string UserEmail { get; set; } // primitive

        [Required]
        //[ValidatePassword]  
        public string UserPassword { get; set; }

        public RegisterUserProfileDto UserProfile { get; set; }

        public RegisterUserDto(string email, string UserPassword, RegisterUserProfileDto userProfile)
        {
            this.UserEmail = email;
            this.UserPassword = UserPassword;
            this.UserProfile = userProfile;
        }

        public User Convert()
        {
            Email email = Email.ValueOf(UserEmail);
            Password password = Password.ValueOf(UserPassword);
            UserProfile userProfile = UserProfile.Convert();
            return new User(email, password, userProfile);
        }
    }
}