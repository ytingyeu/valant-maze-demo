using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.Utils;
using ValantDemoApi.ValantMaze.Models;

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
}
