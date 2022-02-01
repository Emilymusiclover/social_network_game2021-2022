using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.Users
{
    public class AuthenticateModel
    {
        [Required] public string UserEmail { get; set; }

        [Required] public string Password { get; set; }
    }
}