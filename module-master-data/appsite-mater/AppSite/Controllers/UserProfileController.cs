using System.Collections.Generic;
using System.Threading.Tasks;
using AppSite.Domain.Users;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AppSite.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileService _service;


        public UserProfileController(UserProfileService service)
        {
            _service = service;
        }

        //GET: api/UserProfile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserProfileDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/UserProfile/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserProfileDto>> GetGetById(Guid id)
        {
            var userProfile = await _service.GetByIdAsync(new UserProfileId(id));

            if (userProfile == null)
            {
                return NotFound();
            }

            return userProfile;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserDto>> Register(RegisterUserProfileDto dto)
        {
            var userProfile = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {id = userProfile.Id}, userProfile);
        }
    }
}