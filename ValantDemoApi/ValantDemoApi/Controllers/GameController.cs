using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using ValantDemoApi.Models;

namespace ValantDemoApi.Controllers
{
  //[ApiController]
  [Route("[controller]")]
  public class GameController : ControllerBase
  {
    private readonly ILogger<GameController> _logger;
    private readonly ApiContext _context;

    public GameController(ILogger<GameController> logger, ApiContext context)
    {
      _logger = logger;
      _context = context;
    }

    [HttpGet]
    [Route("NextAvailableMoves")]
    public IEnumerable<string> GetNextAvailableMoves()
    {
      return new List<string> { "Up", "Down", "Left", "Right" };
    }
  } 
}
