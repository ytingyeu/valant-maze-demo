using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.ValantMaze
{
  public interface IMazeRepository : IDisposable
  {
    IEnumerable<Maze> GetMazes();
    Task<Maze> GetMazeById(int mazeId);
    void AddMaze(Maze newMaze);
    int Save();
    Task<int> SaveAsync();
  }
}
