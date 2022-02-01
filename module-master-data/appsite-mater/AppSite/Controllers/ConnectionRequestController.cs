using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using AppSite.Domain.Users;
using AppSite.Domain.Shared;
using AppSite.Domain.ConnectionRequests;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionRequestController : ControllerBase
    {
        private readonly ConnectionRequestService _service;

        public ConnectionRequestController(ConnectionRequestService service)
        {
            this._service = service;
        }

        //GET: api/ConnectionRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConnectionRequestDto>>> GetAll()
        {
            try
            {
                return await _service.GetAllAsync();
            }
            catch (BusinessRuleValidationException e)
            {
                return BadRequest(new {Message = e.Message});
            }
        }

        // GET: api/ConnectionRequest/id
        [HttpGet("{id}")]
        public async Task<ActionResult<ConnectionRequestDto>> GetById(Guid id)
        {
            var conn = await _service.GetByIdAsync(new ConnectionRequestId(id));

            if (conn == null)
            {
                return NotFound();
            }

            return conn;
        }

        //GET: api/ConnectionRequests/pendent
        [HttpGet("pendent")]
        public async Task<ActionResult<IEnumerable<ConnectionRequestDto>>> GetAllPendent()
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

        //GET: api/ConnectionRequests/mypendent
        [HttpGet("mypendent={userId}")]
        public async Task<ActionResult<IEnumerable<ConnectionRequestDto>>> GetMyPendent(Guid userId)
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

        // POST: api/ConnectionRequest
        [HttpPost]
        public async Task<ActionResult<ConnectionRequestDto>> Create(CreateConnectionRequestDto dto)
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

        // PUT: api/ConnectionRequest/id
        [HttpPut("{id}")]
        public async Task<ActionResult<ConnectionRequestDto>> Update(Guid id, string update)
        {
            var connectionRequest = _service.GetByIdAsync(new ConnectionRequestId(id));
            if (connectionRequest.Result == null)
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