using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly AuthorizationService _authorizationService;

        public UserService(IUsersRepository usersRepository, AuthorizationService authorizationService)
        {
            _usersRepository = usersRepository;
            _authorizationService = authorizationService;
        }

        public List<User> GetUsers() => _usersRepository.GetAll();

        public bool RegisterUser(UserDTO userDto)
        {
            if(_usersRepository.GetUserByEmail(userDto.Email) != null)
            {
                throw new Exception("Email is already in use");
            };
            userDto.Password = _authorizationService.HashPassword(userDto.Password);
            _usersRepository.AddUser(userDto.ToUser());
            _usersRepository.SaveChanges();
            return true;
        }
    }
}
