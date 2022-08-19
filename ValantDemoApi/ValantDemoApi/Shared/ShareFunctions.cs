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

    public static List<List<string>> ConverGraphStringToGraph(string graphString)
    {
      List<List<string>> graph = new();
      string[] rows = graphString.Split('#');

      for (int i = 0; i < rows.Length; i++)
      {
        foreach (var symbol in rows)
        {
          graph[i].Add(symbol);
        }
      }
      return graph;
    }
  }
}
