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
    public class TagsController : ControllerBase
    {
        private readonly TagService _service;


        public TagsController(TagService service)
        {
            _service = service;
        }

        //GET: api/UserProfile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/UserProfile/id
        [HttpGet("{id}")]
        public async Task<ActionResult<TagDto>> GetGetById(Guid id)
        {
            var tag = await _service.GetByIdAsync(new TagId(id));

            if (tag == null)
            {
                return NotFound();
            }

            return tag;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<TagDto>> Register(CreateTagDto dto)
        {
            var tag = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {id = tag.Id}, tag);
        }
    }
}