using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using AppSite.Domain.Users;
using AppSite.Domain.Shared;
using AppSite.Domain.IntroductionRequests;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntroductionRequestsController : ControllerBase
    {
        private readonly IntroductionRequestService _service;

        public IntroductionRequestsController(IntroductionRequestService service)
        {
            _service = service;
        }

        //GET: api/IntroductionRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> GetAll()
        {
            try
            {
                var list = await _service.GetAllAsync();
                return list;
            }
            catch (BusinessRuleValidationException e)
            {
                return BadRequest(new {Message = e.Message});
            }
        }

        // GET: api/IntroductionRequest/id
        [HttpGet("{id}")]
        public async Task<ActionResult<IntroductionRequestDto>> GetById(Guid id)
        {
            var conn = await _service.GetByIdAsync(new IntroductionRequestId(id));

            if (conn == null)
            {
                return NotFound();
            }

            return conn;
        }

        //GET: api/IntroductionRequests/pendent
        [HttpGet("pendent")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> GetAllPendent()
        {
            try
            {
                return await _service.GetAllPendentAsync();
            }
            catch (BusinessRuleValidationException e)
            {
                return BadRequest(new {Message = e.Message});
            }
        }

        // GET: api/IntroductionRequest/userId=introUserId
        [HttpGet("userId={introUserId}")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> GetByIntroUserId(Guid introUserId)
        {
            try
            {
                var conn = await _service.GetByIntroUserIdAsync(new UserId(introUserId));

                if (conn == null)
                {
                    return NotFound();
                }

                return conn;
            }
            catch (BusinessRuleValidationException e)
            {
                return BadRequest(new {Message = e.Message});
            }
        }

        //GET: api/IntroductionRequests/mypendent
        [HttpGet("mypendent={userId}")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> GetMyPendent(Guid userId)
        {
            try
            {
                var conn = await _service.GetMyPendentAsync(new UserId(userId));

                if (conn == null)
                {
                    return NotFound();
                }

                return conn;
            }
            catch (BusinessRuleValidationException e)
            {
                return BadRequest(new {Message = e.Message});
            }
        }


        // POST: api/IntroductionRequest
        [HttpPost]
        public async Task<ActionResult<IntroductionRequestDto>> Create(CreateIntroductionRequestDto dto)
        {
            try
            {
                var conn = await _service.AddAsync(dto);
                return CreatedAtAction(nameof(GetById), new {id = conn.Id}, conn);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/IntroductionRequest/id
        [HttpPut("{id}")]
        public async Task<ActionResult<IntroductionRequestDto>> Update(Guid id, string update)
        {
            var introductionRequest = _service.GetByIdAsync(new IntroductionRequestId(id));
            if (introductionRequest == null)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _service.UpdateAsync(id, update);

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}