using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")] //localhost:5002/api
    [ApiController]
    public class BaseApiController : ControllerBase
    {
    }
}
