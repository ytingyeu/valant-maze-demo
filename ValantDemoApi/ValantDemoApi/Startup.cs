using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

using System;

namespace ValantDemoApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase(databaseName: "ValantMaze"));
      services.AddCors();
      services.AddControllers();
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "ValantDemoApi", Version = "v1" });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ValantDemoApi v1"));
      }

      var context = app.ApplicationServices.GetService<ApiContext>();
      AddTestData(context);

      app.UseRouting();
      app.UseCors(x => x
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .SetIsOriginAllowed(_ => true)
                 .AllowCredentials());
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
    private static void AddTestData(ApiContext context)
    {

      DateTime dt1 = new(2022, 8, 18, 13, 15, 22);

      var testMaze1 = new DbModels.Maze
      {
        Id = "12",
        UploadDate = dt1.ToUniversalTime().ToString(),
        GraphString = "SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXOXXXXXO#OOOOXXXXXE#",
        Start = new Tuple<int, int>(0, 0),
        Exit = new Tuple<int, int>(6, 9),
      }; 

      context.Mazes.Add(testMaze1);

      DateTime dt2 = new(2022, 8, 18, 16, 29, 52);
      var testMaze2 = new DbModels.Maze
      {
        Id = "13",
        UploadDate = dt2.ToUniversalTime().ToString(),
        GraphString = "SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXXXXOXXX#XXEOOOOXXX#",
        Start = new Tuple<int, int>(0, 0),
        Exit = new Tuple<int, int>(6, 2),
      };

      context.Mazes.Add(testMaze2);
      context.SaveChanges();
    }
  }
}
