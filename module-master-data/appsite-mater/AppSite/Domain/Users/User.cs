using System;
using System.Collections.Generic;
using AppSite.Domain.EmotionalStates;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot, IDtoable<UserDto>
    {
        public Email UserEmail { get; set; }
        public Password UserPassword { get; private set; }
        public UserProfile UserProfile { get; set; }
        public bool Active { get; private set; }
        public EmotionalState EmotionalState { get; set; }

        private User()
        {
            Active = true;
            EmotionalState = EmotionalState.None;
        }

        public User(Email email, Password userPassword)
        {
            Id = new UserId(Guid.NewGuid());
            UserEmail = email;
            UserPassword = userPassword;
            UserProfile = new UserProfile();
        }

        public User(Email email, Password userPassword, UserProfile userProfile)
        {
            Id = new UserId(Guid.NewGuid());
            UserEmail = email;
            UserPassword = userPassword;
            UserProfile = userProfile;
            Active = true;
            EmotionalState = EmotionalState.None;
        }

        public User(Email email, Password userPassword, EmotionalState emotionalState, UserProfile userProfile)
        {
            Id = new UserId(Guid.NewGuid());
            UserEmail = email;
            UserPassword = userPassword;
            UserProfile = userProfile;
            Active = true;
            EmotionalState = emotionalState;
        }

        public void UpdateEmotionalState(EmotionalState emotionalState)
        {
            EmotionalState = emotionalState;
        }

        public UserDto AsDto()
        {
            return new UserDto
            {
                Id = Id.AsGuid(),
                UserEmail = UserEmail.EmailString,
                UserPassword = UserPassword.PasswordString,
                UserProfile = UserProfile?.AsDto(),
            };
        }

        public override bool Equals(object obj)
        {
            return obj is User user &&
                   EqualityComparer<UserId>.Default.Equals(Id, user.Id);
            // && EqualityComparer<Email>.Default.Equals(UserEmail, user.UserEmail);
        }

        public override int GetHashCode()
        {
            //     int hashCode = -650675842;
            //     hashCode = hashCode * -1521134295 + EqualityComparer<Email>.Default.GetHashCode(UserEmail);
            //     hashCode = hashCode * -1521134295 + EqualityComparer<Password>.Default.GetHashCode(UserPassword);
            //     hashCode = hashCode * -1521134295 + EqualityComparer<UserProfile>.Default.GetHashCode(UserProfile);
            //     hashCode = hashCode * -1521134295 + Active.GetHashCode();
            //     return hashCode;
            return HashCode.Combine(Id);
        }
    }
}