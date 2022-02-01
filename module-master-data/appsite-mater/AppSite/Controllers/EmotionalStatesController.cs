using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using AppSite.Domain.Shared;
using AppSite.Domain.EmotionalStates;
using AppSite.Domain.Users;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmotionalStatesController : ControllerBase
    {
        private readonly EmotionalStatesService _service;

        public EmotionalStatesController(EmotionalStatesService service)
        {
            _service = service;
        }

        // GET: api/EmotionalStates/userId={id}
        [HttpGet("userId={userId}")]
        public async Task<ActionResult<string>> GetUserEmotionalState(Guid userId)
        {
            try
            {
                var state = await _service.GetUserEmotionalStateAsync(new UserId(userId));
                return state.ToString();
            }
            catch (BusinessRuleValidationException ex)
            {
                if (ex.Message.Equals("User Not Found"))
                    return NotFound(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        // PATCH: api/EmotionalStates/userId={id}
        [HttpPatch("userId={userId}")]
        public async Task<ActionResult<string>> UpdateUserEmotionalState(Guid userId, string emotionalState)
        {
            try
            {
                await _service.UpdateUserEmotionalStateAsync(new UserId(userId), emotionalState);
                return Ok();
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}