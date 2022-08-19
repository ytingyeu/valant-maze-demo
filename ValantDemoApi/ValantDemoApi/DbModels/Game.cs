using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.DbModels
{
  public class Game
  {
    public int Id { get; set; }
    public int MazeId { get; set; }
    public Tuple<int, int> CurrentPosition {get; set;}
  }
}
