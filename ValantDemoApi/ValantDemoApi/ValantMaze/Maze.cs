using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.Utils;

namespace ValantDemoApi.ValantMaze
{
  public class Maze
  {
    public int Id { get; set; }
    public DateTime UploadDate { get; set; }
    public string GraphString { get; set; }
    public int StartRow { get; set; }
    public int StartCol { get; set; }
    public int ExitRow { get; set; }
    public int ExitCol { get; set; }   
  }

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

  public class PostNewMazeDto
  {
    public string GraphString { get; set; }
    public Cell Start { get; set; }
    public Cell Exit { get; set; }
  }

  public class Cell
  {
    public Cell(int row, int col)
    {
      Row = row;
      Col = col;
    }

    public int Row { get; set; }
    public int Col { get; set; }
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
}


