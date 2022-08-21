using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ValantDemoApi.Models;
using ValantDemoApi.Shared;

namespace ValantDemoApi.Controllers
{
  [ApiController]
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
    public async Task<ActionResult<MazeResponseDto[]>> postNewMaze([FromBody] PostNewMazeDto mazeDto)
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
      catch (Exception ex)
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
      catch (Exception ex)
      {
        _logger.LogError("Error retrieving mazes.", ex);
        return StatusCode(500);
      }

      return Ok(listOfMazeDTO);
    }

    [HttpGet]
    [Route("NextAvailableMoves")]
    public async Task<ActionResult<IEnumerable<Movement>>> GetNextAvailableMoves(int mazeId, int currRow, int currCol)
    {
      Maze maze;

      try
      {
        maze = await _context.Mazes.FindAsync(mazeId);

        if (maze == null)
        {
          return NotFound($"Could not find maze with id {mazeId}");
        }
      }
      catch (Exception ex)
      {
        _logger.LogError("Error retrieving maze by Id.", ex);
        return StatusCode(500);
      }

      var moveList = new List<Movement>();
      var graph = ShareFunctions.ConverGraphStringToGraph(maze.GraphString);

      foreach (string direction in Enum.GetNames(typeof(MoveEnum)))
      {
        if (IsValidMove(currRow, currCol, direction, graph))
        {
          moveList.Add(new Movement(direction, DirectionDict[direction]));
        }
      }

      return moveList;
    }


    private bool IsValidMove(int row, int col, string directionKey, string[][] grpah)
    {
      var moveSteps = DirectionDict[directionKey];
      row += moveSteps.Row;
      col += moveSteps.Col;

      int numOfRows = grpah.Length;
      int numOfCols = grpah[0].Length;

      if (row < 0 || row >= numOfRows)
      {
        return false;
      }

      if (col < 0 || col >= numOfCols)
      {
        return false;
      }

      if (grpah[row][col] == "X")
      {
        return false;
      }

      return true;

    }

    public class Movement
    {
      public Movement(string name, Cell direction)
      {
        Name = name;
        Direction = direction;
      }
      public string Name { get; set; }
      public Cell Direction { get; set; }
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
