using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.Utils;

namespace ValantDemoApi.ValantMaze.Models
{
  public class MazeResponseDto
  {
    public MazeResponseDto() { }
    public MazeResponseDto(Maze maze)
    {
      Id = maze.Id;
      UploadDate = maze.UploadDate;
      Start = new Cell(maze.StartRow, maze.StartCol);
      Exit = new Cell(maze.ExitRow, maze.ExitCol);
      Graph = MazeDemoCommons.ConverGraphStringToGraph(maze.GraphString);
    }

    public int Id { get; set; }
    public DateTime UploadDate { get; set; }
    public Cell Start { get; set; }
    public Cell Exit { get; set; }
    public string[][] Graph { get; set; }
  }
}
