using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.ValantMaze;
using Microsoft.EntityFrameworkCore;

namespace ValantDemoApi
{
  public class ApiContext : DbContext
  {
    public ApiContext() : base() { }
    public ApiContext(DbContextOptions<ApiContext> options)
        : base(options)
    {
    }

    public DbSet<Maze> Mazes { get; set; }
  }
}
