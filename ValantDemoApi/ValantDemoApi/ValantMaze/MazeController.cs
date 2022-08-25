using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ValantDemoApi.Utils;
using ValantDemoApi.ValantMaze.Models;
using static ValantDemoApi.Utils.MazeDemoCommons;

namespace ValantDemoApi.ValantMaze
{
  [ApiController]
  [Route("[controller]")]
  public class MazeController : ControllerBase
  {
    private readonly ILogger<MazeController> _logger;
    private readonly IMazeRepository _mazeRepository;

    public MazeController(ILogger<MazeController> logger, IMazeRepository mazeRepository)
    {
      _logger = logger;
      _mazeRepository = mazeRepository;
    }

    /// <summary>
    /// Finds and reuturns a maze by ID
    /// </summary>
    /// <param name="id">The maze ID</param>
    /// <returns>A DTO of target maze</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<MazeResponseDto>> GetMazeById(int id)
    {
      try
      {
        var maze = await _mazeRepository.GetMazeById(id);

        if (maze == null)
        {
          return NotFound($"Could not find maze with id {id}");
        }

        var mazeDto = new MazeResponseDto(maze);
        return Ok(mazeDto);
      }
      catch (Exception ex)
      {
        _logger.LogError("Error retrieving maze by Id.", ex);
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Returns all mazes
    /// </summary>
    /// <returns>A list of maze response DTO</returns>
    [HttpGet("all")]
    public ActionResult<MazeResponseDto[]> GetAllMazes()
    {
      var listOfMazeDTO = new List<MazeResponseDto>();

      try
      {
        var mazes = _mazeRepository.GetMazes();

        foreach (var maze in mazes)
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

    /// <summary>
    /// Adds new maze into database, then returns it to the client
    /// </summary>
    /// <param name="mazeDto">A request DTO of new maze</param>
    /// <returns>A response DTO of new created maze</returns>
    [HttpPost]
    public async Task<ActionResult<MazeResponseDto[]>> PostNewMaze([FromBody] PostNewMazeDto mazeDto)
    {
      try
      {
        var newMaze = new Maze
        {
          UploadDate = DateTime.UtcNow,
          GraphString = mazeDto.GraphString,
          StartRow = mazeDto.Start.Row,
          StartCol = mazeDto.Start.Col,
          ExitRow = mazeDto.Exit.Row,
          ExitCol = mazeDto.Exit.Col,
        };

        _mazeRepository.AddMaze(newMaze);
        await _mazeRepository.SaveAsync();

        return CreatedAtAction(nameof(GetMazeById), new { id = newMaze.Id }, new MazeResponseDto(newMaze));
      }
      catch (DbUpdateException ex)
      {
        _logger.LogError("Error adding new maze.", ex);
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Returns all availabe moves
    /// </summary>
    /// <returns>A list of movement defination</returns>
    [HttpGet]
    [Route("NextAvailableMoves")]
    public IEnumerable<Movement> GetNextAvailableMoves()
    {
      var moveList = new List<Movement>();
      var directionDict = GetDirectionDict();

      foreach (string direction in Enum.GetNames(typeof(MoveEnum)))
      {
        moveList.Add(new Movement(direction, directionDict[direction]));
      }

      return moveList;
    }    
  }
}
