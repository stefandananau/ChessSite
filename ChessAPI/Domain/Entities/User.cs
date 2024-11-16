using Domain.Enums;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public string Username { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public UserType Type { get; set; }
    }
}
