using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using AppSite.Domain.Ai;
using AppSite.Domain.Users;
using AppSite.Infrastructure;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiController : ControllerBase
    {
        private readonly AiService _service;

        public AiController(AiService service)
        {
            _service = service;
        }

        // GET: api/Ai/hello
        [HttpGet("hello")]
        public async Task<ActionResult<bool>> GetHello()
        {
            return await _service.GetHello();
        }

        // GET: api/Ai/strongestPath
        [HttpGet("strongestPath/origem={Orig}&destino={Dest}")]
        public async Task<ActionResult<string>> GetStrongestPath(string Orig, string Dest)
        {
            return await _service.GetStrongestPath(Orig, Dest);
        }

        // GET: api/Ai/safestPath
        [HttpGet("safestPath/origem={Orig}&destino={Dest}&limit={limit}")]
        public async Task<ActionResult<string>> GetSafestPath(string Orig, string Dest, int limit)
        {
            return await _service.GetSafestPath(Orig, Dest, limit);
        }

        // GET: api/Ai/shortestPath
        [HttpGet("shortestPath/origem={Orig}&destino={Dest}")]
        public async Task<ActionResult<string>> GetShortestPath(string Orig, string Dest)
        {
            return await _service.GetShortestPath(Orig, Dest);
        }

        // GET: api/Ai/FriendRecommendations/userId={userId}
        [HttpGet("FriendRecommendations/userId={userId:guid}")]
        public async Task<ActionResult<List<UserDto>>> GetFriendRecommendations(Guid userId)
        {
            return await _service.GetFriendRecommendations(new UserId(userId));
        }

        // GET: api/Ai/ExportKnowledgeBase
        [HttpGet("ExportKnowledgeBase")]
        public async Task<ActionResult> ExportKnowledgeBase()
        {
            // generate knowledge base
            var knowledgeBase = await _service.ExportKnowledgeBase();
            if (knowledgeBase == null) return NotFound();
            // write into file
            if (!await FileHandler.ExportNetwork(knowledgeBase)) throw new Exception("IO failed");
            return Ok();
        }

        // GET: api/Ai/LoadKnowledgeBase
        [HttpGet("LoadKnowledgeBase")]
        public async Task<ActionResult> LoadKnowledgeBase()
        {
            // load knowledge base
            if (!await _service.LoadKnowledgeBase()) throw new Exception("Loading Failed");
            return Ok();
        }
    }
}