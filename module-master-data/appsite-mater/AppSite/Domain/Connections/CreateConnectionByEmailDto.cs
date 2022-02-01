using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.Connections
{
    public class CreateConnectionByEmailDto
    {
        [Required] public string UserEmail1 { get; set; }
        [Required] public string UserEmail2 { get; set; }
        [Required] public int Strength1 { get; set; }
        [Required] public int Strength2 { get; set; }
    }
}