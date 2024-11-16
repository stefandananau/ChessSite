using Application.DTOs;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChessAPI.Controllers
{
    [Route("[controller]")]
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
        public IActionResult Register([FromBody] UserDTO registerData)
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
    }
}
