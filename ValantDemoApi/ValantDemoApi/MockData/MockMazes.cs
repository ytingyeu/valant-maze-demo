using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.Models;

namespace ValantDemoApi.MockData
{
  public class MockMazes
  {
    public MockMazes()
    {
      DateTime dt1 = new(2022, 8, 18, 13, 15, 22);
      TestMaze1 = new Maze
      {
        Id = 12,
        UploadDate = dt1.ToUniversalTime().ToString(),
        GraphString = "SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXOXXXXXO#OOOOXXXXXE#",
        StartRow = 0,
        StartCol = 0,
        ExitRow = 6,
        ExitCol = 9
      };

      DateTime dt2 = new(2022, 8, 18, 16, 29, 52);
      TestMaze2 = new Maze
      {
        Id = 13,
        UploadDate = dt2.ToUniversalTime().ToString(),
        GraphString = "SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXXXXOXXX#XXEOOOOXXX#",
        StartRow = 0,
        StartCol = 0,
        ExitRow = 6,
        ExitCol = 2
      };
    }

    public Maze TestMaze1 { get; set; }
    public Maze TestMaze2 { get; set; }
  }
}

