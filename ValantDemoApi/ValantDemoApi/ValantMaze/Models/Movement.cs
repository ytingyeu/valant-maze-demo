using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.ValantMaze.Models
{
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
