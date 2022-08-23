using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.ValantMaze;

namespace ValantDemoApi.Utils
{
  public class MazeDemoCommons
  {

    private static int mockMazeIdCounter = 14;

    public static int GetCurrentMockMazeId()
    {
      return mockMazeIdCounter;
    }

    public static int GetLastCreatedMockMazeId()
    {
      return mockMazeIdCounter - 1;
    }

    public static int GenerateMockMazeId()
    {
      return mockMazeIdCounter++;
    }

    public static string[][] ConverGraphStringToGraph(string graphString)
    {
      string[] rows = graphString.Split('#');

      // the last line also includes a '#' as end-of-row,
      // this causes after splitting, there is an empty string at rows[rows.Length]
      // we want to ignore it
      int numOfRows = rows.Length - 1;

      string[][] graph = new string[numOfRows][];

      for (int i = 0; i < numOfRows; i++)
      {
        var temp = new List<string>();

        foreach (var symbol in rows[i])
        {
          temp.Add(symbol.ToString());
        }
        graph[i] = temp.ToArray();
      }

      return graph;
    }

    public enum MoveEnum
    {
      Up, Down, Left, Right
    }

    public static Dictionary<string, Cell> GetDirectionDict()
    {
      return new Dictionary<string, Cell>
      {
        { MoveEnum.Up.ToString(), new Cell(-1, 0) },
        { MoveEnum.Down.ToString(), new Cell(1, 0) },
        { MoveEnum.Left.ToString(), new Cell(0, -1) },
        { MoveEnum.Right.ToString(), new Cell(0, 1) },
      };
    }
  }
}
