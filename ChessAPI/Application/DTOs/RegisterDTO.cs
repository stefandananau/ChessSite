using Domain.Entities;
using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        public required string Username { get; set; }


        public User ToUser() => new User { Email = Email, PasswordHash = Password, Username = Username, Role = UserRole.User };
    }
}
