using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.Shared
{
  public class ShareFunctions
  {

    private static int mockIdCounter = 14;

    public static int GenerateMockMazeId()
    {      
      return mockIdCounter++;
    }

    public static string[][] ConverGraphStringToGraph(string graphString)
    {
      string[] rows = graphString.Split('#');
      
      int numOfRows = rows.Length;
      //int numOfCols = rows[0].Length;

      string[][] graph = new string[numOfRows][];

      for (int i = 0; i < rows.Length; i++)
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
  }
}
