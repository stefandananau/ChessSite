using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class UserDTO
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }

        public string Username { get; set; } = string.Empty;

        public User ToUser() => new User { Email = Email, PasswordHash = Password, Username = Username };
    }
}
