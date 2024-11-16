using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class UsersRepository : BaseRepository<User>, IUsersRepository
    {
        public UsersRepository(ChessDataContext dataContext) : base(dataContext) { }

        public void AddUser(User user)
        {
            _dataContext.Users.Add(user);
        }

        public void RemoveUser(User user)
        {
            _dataContext.Users.Remove(user);
        }

        public User GetUserById(int id)
        {
            var result = _dataContext.Users.FirstOrDefault(user => user.Id == id);
            return result;
        }

        public User GetUserByEmail(string email)
        {
            var result = _dataContext.Users.FirstOrDefault(user => user.Email == email);
            return result;
        }
    }
}
