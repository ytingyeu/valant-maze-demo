using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using ValantDemoApi.Models;

namespace ValantDemoApi.Controllers
{
  //[ApiController]
  [Route("[controller]")]
  public class MazeController : ControllerBase
  {
    private readonly ILogger<MazeController> _logger;
    private readonly ApiContext _context;

    public MazeController(ILogger<MazeController> logger, ApiContext context)
    {
      _logger = logger;
      _context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Maze>> GetMazeById(int id)
    {
      var maze = await _context.Mazes.FindAsync(id);

      if (maze == null)
      {
        return NotFound();
      }

        [HttpGet]
        public IEnumerable<string> GetNextAvailableMoves()
        {
          return new List<string> {"Up", "Down", "Left", "Right"};
        }
      return maze;
    }

    [HttpGet("all")]
    public ActionResult<Maze> GetAllMazes()
    {
      return Ok(_context.Mazes);
    }
  }
}
