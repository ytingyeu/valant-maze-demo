using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.ValantMaze.Models
{
  public class PostNewMazeDto
  {
    public string GraphString { get; set; }
    public Cell Start { get; set; }
    public Cell Exit { get; set; }
  }
}
