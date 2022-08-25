using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.ValantMaze.Models
{
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
