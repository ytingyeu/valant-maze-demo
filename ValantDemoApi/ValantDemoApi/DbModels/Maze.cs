using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.DbModels
{
  public class Maze
  {
    public string Id { get; set; }
    public string UploadDate { get; set; }

    public string GraphString { get; set; }

    public Tuple<int, int> Start { get; set; }

    public Tuple<int, int> Exit { get; set; }    
  }
}
