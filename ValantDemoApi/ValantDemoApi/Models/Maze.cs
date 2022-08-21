using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.Models;

namespace ValantDemoApi.Models
{
  public class Maze
  {
    public int Id { get; set; }
    public string UploadDate { get; set; }
    public string GraphString { get; set; }
    public int StartRow { get; set; }
    public int StartCol { get; set; }
    public int ExitRow { get; set; }
    public int ExitCol { get; set; }   
  }

  public class MazeResponseDto
  {

    public MazeResponseDto(Maze maze)
    {
      Id = maze.Id;
      UploadDate = maze.UploadDate;
      GraphString = maze.GraphString;

      Start = new Cell(maze.StartRow, maze.StartCol);
      Exit = new Cell(maze.ExitRow, maze.ExitCol);
    }


    public int Id { get; set; }
    public string UploadDate { get; set; }
    public string GraphString { get; set; }
    public Cell Start { get; set; }
    public Cell Exit { get; set; }
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
}


