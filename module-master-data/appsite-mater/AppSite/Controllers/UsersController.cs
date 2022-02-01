using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using AppSite.Domain.Users;
using AppSite.Domain.Shared;
using AppSite.Domain.Tags;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System;

namespace AppSite.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _service;

        public UsersController(UserService service)
        {
            _service = service;
        }

        //GET: api/User
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        //GET: api/User
        [AllowAnonymous]
        [HttpGet("userIds")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllByIds([FromQuery(Name = "ids")] List<Guid> ids)
        {
            var listIds = ids.ConvertAll(id => new UserId(id));

            if (listIds == null)
            {
                return NotFound();
            }

            return await _service.GetByIds(listIds);
        }

        // GET: api/User/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetGetById(Guid id)
        {
            try
            {
                var user = await _service.GetByIdAsync(new UserId(id));
                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }
            catch (BusinessRuleValidationException e)
            {
                return BadRequest(new {Message = e.Message});
            }
        }

        // GET: api/User/email={email}
        [AllowAnonymous]
        [HttpGet("email={email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
        {
            try
            {
                var user = await _service.GetUserByEmail(email);
                if (user == null)
                {
                    return NotFound();
                }

                return user.AsDto();
            }
            catch (BusinessRuleValidationException e)
            {
                return BadRequest(new {Message = e.Message});
            }
        }

        // GET: api/User/5
        [HttpGet("UserProfile/id={id}")]
        public async Task<ActionResult<UserProfileDto>> GetUserProfileById(Guid id)
        {
            var userProfile = await _service.GetUserProfileByIdAsync(new UserId(id));

            if (userProfile == null)
            {
                return NotFound();
            }

            return userProfile;
        }

        [HttpGet("UserTagCloud/id={id}")]
        public async Task<ActionResult<TagCloudDto>> GetTagCloudByUserId(Guid id)
        {
            var userTagCloud = await _service.GetTagCloudByUserId(new UserId(id));

            if (userTagCloud == null)
            {
                return NotFound();
            }

            return userTagCloud;
        }

        /*
        // GET: api/User/5
        [HttpGet("email={email},password={password}")]
        public async Task<ActionResult<UserDto>> GetUserLogIn(string email,string password)
        {
           
            try{
                 var user = await _service.GetUserLoginIn(email,password);
           /** if (user == null)
            {
                return NotFound();
            }
         

            return user;
            }catch(BusinessRuleValidationException e){
                    return BadRequest(new { Message = e.Message });
            }
            
        }
        */

        // POST: api/User
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserDto>> Register(RegisterUserDto dto)
        {
            try
            {
                var user = await _service.AddAsync(dto);
                return CreatedAtAction(nameof(GetGetById), new {id = user.Id}, user);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/UserProfile/id
        [HttpPut("UserProfile/{id}")]
        public async Task<ActionResult<UserProfileDto>> Update(String id, UserProfileDto dto)
        {
            /*
            var userProfile = await _service.GetUserProfileByIdAsync(new UserId(id));

            if (userProfile == null)
            {
                return NotFound();
            }
            */

            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var userProfileDto = await _service.UpdateAsync(dto);

                if (userProfileDto == null)
                {
                    return NotFound();
                }

                return Ok(userProfileDto);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateModel model)
        {
            var user = await _service.Authenticate(model.UserEmail, model.Password);

            if (user == null) return BadRequest(new {message = "Username or password is incorrect"});

            return Ok(user);
        }
    }
}