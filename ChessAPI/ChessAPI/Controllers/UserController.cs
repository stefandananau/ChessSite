using Application.DTOs;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChessAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegisterDTO registerData)
        {
            if (_userService.RegisterUser(registerData))
            {
                return Ok("User registered successfully");
            }
            else
            {
                return BadRequest("Something wrong happened");
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginDTO loginData)
        {
            var jwtToken = _userService.ValidateLogin(loginData);
            return Ok(jwtToken);
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public IActionResult Refresh([FromBody] TokenDto refreshData)
        {
            var tokenDtoToReturn = _userService.RefreshToken(refreshData);
            return Ok(tokenDtoToReturn);
        }

        [HttpGet("all-users")]
        [Authorize]
        public ActionResult<List<User>> GetAllUsers()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteUserById([FromBody] IdDTO user)
        {
            if (_userService.RemoveUserById(user))
            {
                return Ok("User deleted");
            }
            return BadRequest("User is not in list of users");
        }
    }
}
