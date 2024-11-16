﻿using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUsersRepository : IBaseRepository<User>
    {
        public void AddUser(User user);
        public void RemoveUser(User user);
        public User GetUserById(int id);
        public User GetUserByEmail(string email);
    }
}