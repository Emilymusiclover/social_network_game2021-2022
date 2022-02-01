using System.Collections.Generic;
using System.Threading.Tasks;
using AppSite.Domain.Tags;
using Microsoft.AspNetCore.Mvc;
using AppSite.Domain.Shared;
using System;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagCloudController : ControllerBase
    {
        private readonly TagCloudService _service;

        public TagCloudController(TagCloudService service)
        {
            _service = service;
        }

        //GET: api/UserProfile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagCloudDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/UserProfile/id
        [HttpGet("{id}")]
        public async Task<ActionResult<TagCloudDto>> GetGetById(Guid id)
        {
            var tagCloud = await _service.GetByIdAsync(new TagCloudId(id));

            if (tagCloud == null)
            {
                return NotFound();
            }

            return tagCloud;
        }

        // PUT: api/UserProfile/id
        [HttpPut("UserProfile/{id}")]
        public async Task<ActionResult<TagCloudDto>> Update(Guid id, TagCloudDto dto)
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
                var tagCloudDto = await _service.updateTagCloud(dto);

                if (tagCloudDto == null)
                {
                    return NotFound();
                }

                return Ok(tagCloudDto);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }


        [HttpPost("id={id}")]
        public async Task<ActionResult<TagCloudDto>> AddTagsToTagCloud(Guid id, List<string> tags)
        {
            var tagCloud = await _service.AddTagsToTagCloud(new TagCloudId(id), tags);

            if (tagCloud == null)
            {
                return NotFound();
            }

            return tagCloud;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<TagCloudDto>> Register(CreateTagCloudDto dto)
        {
            var tagCloud = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {id = tagCloud.Id}, tagCloud);
        }
    }
}