using Application.DTOs;
using Application.Interfaces;
using Domain.Constants;
using Domain.Entities;
using System.Text.RegularExpressions;

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

        public List<User> GetAll() => _usersRepository.GetAll();

        public bool RegisterUser(RegisterDTO userDto)
        {
            if(!Regex.IsMatch(userDto.Email, RegularExpressions.EMAIL_REGEX))
            {
                throw new Exception("Email not valid");
            }
            if (!Regex.IsMatch(userDto.Password, RegularExpressions.PASSWORD_REGEX))
            {
                throw new Exception("Password should be between 8-20 characters with at least 1 letter 1 number and 1 special character");
            }
            if (!Regex.IsMatch(userDto.Username, RegularExpressions.USERNAME_REGEX))
            {
                throw new Exception("Username should be between 3-20 characters letters and numbers only");
            }
            if(_usersRepository.GetUserByEmail(userDto.Email) != null)
            {
                throw new Exception("Email is already in use");
            };
            if (_usersRepository.GetUserByUserName(userDto.Username) != null)
            {
                throw new Exception("Username is already in use");
            };
            userDto.Password = _authorizationService.HashPassword(userDto.Password);
            _usersRepository.AddUser(userDto.ToUser());
            _usersRepository.SaveChanges();
            return true;
        }

        public TokenDto ValidateLogin(LoginDTO userDto)
        {
            var user = _usersRepository.GetUserByEmail(userDto.Email);
            if(user == null)
            {
                throw new Exception("Wrong email or password");
            }
            if(!_authorizationService.VerifyHashedPassword(user.PasswordHash, userDto.Password))
            {
                throw new Exception("Wrong email or password");
            }

            var tokenDto = _authorizationService.GetToken(_usersRepository, user, user.Role, true);

            return tokenDto;
        }

        public bool RemoveUserById(IdDTO idDto)
        {
            var user = _usersRepository.GetUserById(idDto.Id);
            if (user == null) return false;
            _usersRepository.RemoveUser(user);
            _usersRepository.SaveChanges();
            return true;
        }

        public TokenDto RefreshToken(TokenDto refreshData)
        {
            return _authorizationService.RefreshToken(_usersRepository,refreshData);
        }
    }
}
