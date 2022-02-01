using System;
using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.Connections
{
    public class CreateConnectionDto
    {
        [Required] public Guid UserId1 { get; set; }

        [Required] public Guid UserId2 { get; set; }

        [Required] public int Strength1 { get; set; }

        [Required] public int Strength2 { get; set; }
    }
}