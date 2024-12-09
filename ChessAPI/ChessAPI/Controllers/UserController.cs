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
        async public IActionResult Register([FromBody] RegisterDTO registerData)
        {
            try
            {
                if (_userService.RegisterUser(registerData))
                {
                    return Ok("User registered successfully");
                }
                else
                {
                    return BadRequest(error: new { error = "Something wrong happened" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(error: new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginDTO loginData)
        {
            try
            {
                var jwtToken = _userService.ValidateLogin(loginData);
                return Ok(jwtToken);
            }
            catch (Exception ex)
            {
                return BadRequest(error: new { error = ex.Message });
            }
        }

        [HttpPost("externalSignup")]
        [AllowAnonymous]
        public IActionResult ExternalSignup([FromBody] ExternalSignupDTO externalSignupData)
        {
            {
                try
                {
                    var jwtToken = _userService.ValidateExternalSignup(externalSignupData);
                    return Ok(jwtToken);
                }
                catch (Exception ex)
                {
                    return BadRequest(error: new { error = ex.Message });
                }
            }
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public IActionResult Refresh([FromBody] TokenDto refreshData)
        {
            try
            {
                var tokenDtoToReturn = _userService.RefreshToken(refreshData);
                return Ok(tokenDtoToReturn);
            }
            catch (Exception ex)
            {
                return BadRequest(error: new { error = ex.Message });
            }

        }

        [HttpGet("all-users")]
        [AllowAnonymous]
        public ActionResult<List<User>> GetAllUsers()
        {
            try {
                var users = _userService.GetAll();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(error: new { error = ex.Message });

            }
        }

        [HttpDelete("delete")]
        [AllowAnonymous]
        public ActionResult DeleteUserById([FromBody] IdDTO user)
        {
            try
            {
                if (_userService.RemoveUserById(user))
                {
                    return Ok("User deleted");
                }
                return BadRequest(error: new { error = "User not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(error: new { error = ex.Message });

            }
        }
    }
}

