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

    /// <summary>
    /// Find and returns a maze by ID from injected context
    /// </summary>
    /// <param name="mazeId">Maze ID</param>
    /// <returns>A maze object</returns>
    public async Task<Maze> GetMazeById(int mazeId)
    {
      var foundMaze = await _context.Mazes.FindAsync(mazeId);
      return foundMaze;
    }

    /// <summary>
    /// Returns all maze from injected context
    /// </summary>
    /// <returns>A list of maze</returns>
    public IEnumerable<Maze> GetMazes()
    {
      return _context.Mazes.ToList();
    }

    /// <summary>
    /// Save context changes asynchronously
    /// </summary>
    /// <returns>A task contains the number of entries written into the context</returns>
    public Task<int> SaveAsync()
    {
      return _context.SaveChangesAsync();
    }

    /// <summary>
    /// Save context changes synchronously
    /// </summary>
    /// <returns>The number of entries written into the context</returns>
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
