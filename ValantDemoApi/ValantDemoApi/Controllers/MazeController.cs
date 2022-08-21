using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
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
    public async Task<ActionResult<MazeResponseDto>> GetMazeById(int id)
    {
      try
      {
        var maze = await _context.Mazes.FindAsync(id);

        if (maze == null)
        {
          return NotFound();
        }

        var mazeDto = new MazeResponseDto(maze);
        return Ok(mazeDto);
      }
      catch(Exception ex)
      {
        _logger.LogError("Error retrieving maze by Id.", ex);
        return StatusCode(500);
      }
    }

    [HttpGet("all")]
    public ActionResult<MazeResponseDto[]> GetAllMazes()
    {
      var listOfMazeDTO = new List<MazeResponseDto>();

      try
      {
        foreach (var maze in _context.Mazes)
        {
          listOfMazeDTO.Add(new MazeResponseDto(maze));
        }        
      }
      catch (Exception ex)
      {
        _logger.LogError("Error retrieving mazes.", ex);
        return StatusCode(500);
      }

      return Ok(listOfMazeDTO);
    }

    [HttpPost]
    public async Task<ActionResult<MazeResponseDto[]>> PostMaze([FromBody] MazePostDto mazeDto)
    {
      try
      {
        var newMaze = new Maze
        {
          Id = Shared.ShareFunctions.GenerateMockMazeId(),
          UploadDate = DateTime.UtcNow.ToString(),
          GraphString = mazeDto.GraphString,
          StartRow = mazeDto.Start.Row,
          StartCol = mazeDto.Start.Col,
          ExitRow = mazeDto.Exit.Row,
          ExitCol = mazeDto.Exit.Col,
        };

        _context.Mazes.Add(newMaze);
        await _context.SaveChangesAsync();
      }
      catch(Exception ex)
      {
        _logger.LogError("Error adding new maze.", ex);
        return StatusCode(500);
      }      

      var listOfMazeDTO = new List<MazeResponseDto>();

      try
      {
        foreach (var maze in _context.Mazes)
        {
          listOfMazeDTO.Add(new MazeResponseDto(maze));
        }
      }
      catch(Exception ex)
      {
        _logger.LogError("Error retrieving mazes.", ex);
        return StatusCode(500);
      }

      return Ok(listOfMazeDTO);
    }
  }
}
