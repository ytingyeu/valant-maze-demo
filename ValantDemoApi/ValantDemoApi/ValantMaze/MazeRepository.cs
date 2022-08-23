using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ValantDemoApi.ValantMaze
{
  public class MazeRepository : IMazeRepository, IDisposable
  {
    private readonly ApiContext _context;

    public MazeRepository(ApiContext context)
    {
      this._context = context;
    }

    public void AddMaze(Maze newMaze)
    {
      _context.Mazes.Add(newMaze);
    }

    public async Task<Maze> GetMazeById(int mazeId)
    {
      var foundMaze = await _context.Mazes.FindAsync(mazeId);
      return foundMaze;
    }

    public IEnumerable<Maze> GetMazes()
    {
      return _context.Mazes.ToList();
    }

    public Task<int> SaveAsync()
    {
      return _context.SaveChangesAsync();
    }

    public int Save()
    {
      return _context.SaveChanges();
    }

    private bool disposed = false;

    protected virtual void Dispose(bool disposing)
    {
      if (!this.disposed)
      {
        if (disposing)
        {
          _context.Dispose();
        }
      }
      this.disposed = true;
    }

    public void Dispose()
    {
      Dispose(true);
      GC.SuppressFinalize(this);
    }
  }
}
