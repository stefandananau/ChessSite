using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Infrastructure.Data
{
    public class ChessDataContext : DbContext
    {
        public ChessDataContext(DbContextOptions<ChessDataContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer("Data Source=STEFANLENOVO;Server=localhost;User ID=stefan1234;Password=1234;Database=ChessSite;Trusted_Connection=True;TrustServerCertificate=true;")
                .LogTo(Console.WriteLine);
        }

        public DbSet<User> Users { get; set; }
    }
}
