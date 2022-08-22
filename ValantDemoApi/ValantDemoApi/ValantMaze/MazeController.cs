using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ValantDemoApi.Shared;

namespace ValantDemoApi.ValantMaze
{
  [ApiController]
  [Route("[controller]")]
  public class MazeController : ControllerBase
  {
    private readonly ILogger<MazeController> _logger;
    private readonly ApiContext _context;
    private IMazeRepository _mazeRepository;

    public MazeController(ILogger<MazeController> logger, ApiContext context, IMazeRepository mazeRepository)
    {
      _logger = logger;
      _context = context;
      _mazeRepository = mazeRepository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MazeResponseDto>> GetMazeById(int id)
    {
      try
      {
        //var maze = await _context.Mazes.FindAsync(id);
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

    [HttpGet("all")]
    public ActionResult<MazeResponseDto[]> GetAllMazes()
    {
      var listOfMazeDTO = new List<MazeResponseDto>();

      var mazes = _mazeRepository.GetMazes();

      try
      {
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

    [HttpPost]
    public async Task<ActionResult<MazeResponseDto[]>> PostNewMaze([FromBody] PostNewMazeDto mazeDto)
    {
      try
      {
        var newMaze = new Maze
        {
          Id = ShareFunctions.GenerateMockMazeId(),
          UploadDate = DateTime.UtcNow.ToString(),
          GraphString = mazeDto.GraphString,
          StartRow = mazeDto.Start.Row,
          StartCol = mazeDto.Start.Col,
          ExitRow = mazeDto.Exit.Row,
          ExitCol = mazeDto.Exit.Col,
        };

        _mazeRepository.AddMaze(newMaze);
        await _mazeRepository.SaveAsync();

        //_context.Mazes.Add(newMaze);
        //await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMazeById), new { id = newMaze.Id }, new MazeResponseDto(newMaze));
      }
      catch (DbUpdateException ex)
      {
        _logger.LogError("Error adding new maze.", ex);
        return StatusCode(500);
      }
    }

    [HttpGet]
    [Route("NextAvailableMoves")]
    public IEnumerable<Movement> GetNextAvailableMoves()
    {
      var moveList = new List<Movement>();

      foreach (string direction in Enum.GetNames(typeof(MoveEnum)))
      {
          moveList.Add(new Movement(direction, DirectionDict[direction]));
      }

      return moveList;
    }    

    private enum MoveEnum
    {
      Up, Down, Left, Right
    }

    private static Dictionary<string, Cell> DirectionDict => new()
    {
        { MoveEnum.Up.ToString(), new Cell (-1, 0) },
        { MoveEnum.Down.ToString(), new Cell (1, 0) },
        { MoveEnum.Left.ToString(), new Cell (0, -1) },
        { MoveEnum.Right.ToString(), new Cell (0, 1) },
    };
  }
}
