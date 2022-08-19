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
    
    //public Cell Start { get; set;  }
    //public Cell Exit { get; set; }

    //public List<List<String>> Graph { get; set; }
  }

  public class MazeDTO
  {
    public int Id { get; set; }
    public string UploadDate { get; set; }
    public string GraphString { get; set; }
    public List<int> Start { get; set; }
    public List<int> End { get; set; }
  }
}


