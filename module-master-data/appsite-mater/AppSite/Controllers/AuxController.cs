using AppSite.Domain.Users;
using AppSite.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Auxiliary Controller
    public class AuxController : ControllerBase
    {
        private readonly AppSiteContext _context;

        public AuxController(AppSiteContext context)
        {
            _context = context;
        }

        // DELETE: api/Aux/hard
        [HttpDelete("hard")]
        public ActionResult DeleteAll()
        {
            // reset database
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
            // return ok
            return Ok("All data was removed");
        }

        [HttpDelete]
        public ActionResult ResetDatabase()
        {
            DeleteAll();
            // create & save user
            var user = new User(new Email("admin@email.com"), new Password("Admin!54321"));
            _context.Add(user);
            // save changes
            _context.SaveChangesAsync();
            // return ok
            return Ok("Database restored");
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult GetServerStatus()
        {
            return Ok("On");
        }
    }
}