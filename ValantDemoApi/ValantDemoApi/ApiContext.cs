using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ValantDemoApi.DbModels;
using Microsoft.EntityFrameworkCore;

namespace ValantDemoApi
{
  public class ApiContext : DbContext
  {
    public ApiContext(DbContextOptions<ApiContext> options)
        : base(options)
    {
    }

    public DbSet<Maze> Mazes { get; set; }

    public DbSet<Game> Games { get; set; }
  }
}
