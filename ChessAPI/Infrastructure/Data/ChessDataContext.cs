using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.EntityFrameworkCore.SqlServer.Infrastructure.Internal;
using Microsoft.Extensions.Options;
using System.Data.Common;

namespace Infrastructure.Data
{
    public class ChessDataContext : DbContext
    {
        //private string _connectionString;
        public ChessDataContext(DbContextOptions<ChessDataContext> options) : base(options)
        {
            //_connectionString = options.FindExtension<SqlServerOptionsExtension>().ConnectionString;
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
