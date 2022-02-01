using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AppSite.Domain.Networks;
using AppSite.Domain.Users;
using Microsoft.AspNetCore.Authorization;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetworksController : ControllerBase
    {
        private readonly NetworksService _service;

        public NetworksController(NetworksService service)
        {
            _service = service;
        }

        // GET: api/Networks/ExportAsDto/userId={userId}&layer={layer}
        [HttpGet("ExportAsDto/userId={userId:guid}&layer={layer:int}")]
        public async Task<Dictionary<UserId, IEnumerable<UserId>>> ExportAsDto(Guid userId, int layer)
        {
            return await _service.ExportAsDto(new UserId(userId), layer);
        }

        // GET: api/Networks/ExportAsKnowledgeBase/userId={userId}&layer={layer}
        [HttpGet("ExportAsKnowledgeBase/userId={userId:guid}&layer={layer:int}")]
        public async Task<ActionResult<string>> ExportAsKnowledgeBase(Guid userId, int layer)
        {
            return await _service.ExportAsKnowledgeBase(new UserId(userId), layer);
        }
    }
}