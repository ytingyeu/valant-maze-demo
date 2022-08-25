using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.ValantMaze.Models;

namespace ValantDemoApi.Utils
{
  public class MazeDemoCommons
  {
    /// <summary>
    /// Convert a graph string to 2-D string array
    /// </summary>
    /// <param name="graphString">A string of maze definition</param>
    /// <returns>A 2-D string array represents a maze</returns>
    public static string[][] ConverGraphStringToGraph(string graphString)
    {
      const string replaceInvalidSymbol = "X";

      HashSet<char> validSymols = new()
      {
        'S', 'E', 'X', 'O'
      };

      graphString = graphString.ToUpper();
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
          if(validSymols.Contains(symbol))
          {
            temp.Add(symbol.ToString());
          }
          else
          {
            temp.Add(replaceInvalidSymbol);
          }
          
        }
        graph[i] = temp.ToArray();
      }

      return graph;
    }

    public enum MoveEnum
    {
      Up, Down, Left, Right
    }

    /// <summary>
    /// Returns a dictionary of movement definitions
    /// { key: movement name; value: a Cell class represents the euclidean vector of movement;}
    /// </summary>
    /// <returns>A dictionary of movement definitions</returns>
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
