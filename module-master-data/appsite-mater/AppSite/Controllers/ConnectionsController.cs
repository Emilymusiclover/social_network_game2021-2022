using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using AppSite.Domain.Shared;
using AppSite.Domain.Connections;
using AppSite.Domain.Users;
using AppSite.Domain.Tags;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionsController : ControllerBase
    {
        private readonly ConnectionsService _service;

        public ConnectionsController(ConnectionsService service)
        {
            _service = service;
        }

        // GET: api/Connections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConnectionDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Connections/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ConnectionDto>> GetById(Guid id)
        {
            var conn = await _service.GetByIdAsync(new ConnectionId(id));
            if (conn == null) return NotFound();
            return conn;
        }

        // GET: api/Connections/userId1={userId1}&userId2={userId1}
        [HttpGet("userId1={userId1:guid}&userId2={userId2:guid}")]
        public async Task<ActionResult<ConnectionDto>> GetByUsersId(Guid userId1, Guid userId2)
        {
            var conn = await _service.GetConnectionByUsers(new UserId(userId1), new UserId(userId2));
            if (conn == null) return NotFound();
            return conn;
        }

        // GET: api/Connections/userId={userId}
        [HttpGet("userId={userId:guid}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetFriends(Guid userId)
        {
            var users = await _service.GetFriends(new UserId(userId));
            if (users == null) return NotFound();
            return users;
        }

        // GET: api/Connections/idUser1={idUser1}&idUser2={idUser2}
        [HttpGet("idUser1={idUser1:guid}&idUser2={idUser2:guid}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetCommonFriends(Guid idUser1, Guid idUser2)
        {
            var users = await _service.GetCommonFriends(new UserId(idUser1), new UserId(idUser2));
            if (users == null) return NotFound();
            return users;
        }

        // GET: api/Connections/idUser1={idUser1}
        [HttpGet("idUser1={idUser1:guid}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetFriendsToBe(Guid idUser1)
        {
            var users = await _service.GetFriendsToBe(new UserId(idUser1));
            if (users == null) return NotFound();
            return users;
        }


        // POST: api/Connections
        [HttpPost]
        public async Task<ActionResult<ConnectionDto>> Create(CreateConnectionDto dto)
        {
            try
            {
                var conn = await _service.AddAsync(dto);
                return CreatedAtAction(nameof(GetById), new {id = conn.Id}, conn);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Connections/email
        [HttpPost("email")]
        public async Task<ActionResult<ConnectionDto>> CreateByEmail(CreateConnectionByEmailDto dto)
        {
            try
            {
                var conn = await _service.AddAsync(dto);
                return CreatedAtAction(nameof(GetById), new {id = conn.Id}, conn);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Connections/{id}
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<ConnectionDto>> Update(Guid id, ConnectionDto dto)
        {
            if (id != dto.Id)
                return BadRequest();

            try
            {
                var conn = await _service.UpdateAsync(dto);
                if (conn == null) return NotFound();
                return Ok(conn);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Connection/{id}
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<ConnectionDto>> Delete(Guid id)
        {
            try
            {
                var conn = await _service.DeleteAsync(new ConnectionId(id));
                if (conn == null) return NotFound();
                return Ok(conn);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("connectionId={id:guid}")]
        public async Task<ActionResult<TagCloudDto>> UpdateConnectionTagCloud(Guid id, TagCloudDto dto)
        {
            if (id != dto.Id)
                return BadRequest();

            try
            {
                var tagCloud = await _service.UpdateConnectionTagCloud(dto, new ConnectionId(id));
                if (tagCloud == null) return NotFound();
                return Ok(tagCloud);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}