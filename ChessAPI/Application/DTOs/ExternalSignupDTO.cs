using Domain.Entities;
using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class ExternalSignupDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Identifier { get; set; }

        [Required]
        public string Username { get; set; }
        public User ToUser() => new User { Email = Email, PasswordHash = Identifier, Username = Username, Role = UserRole.User };
    }
}
