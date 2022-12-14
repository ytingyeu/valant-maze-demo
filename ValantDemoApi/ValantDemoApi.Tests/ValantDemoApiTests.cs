using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using ValantDemoApi.MockData;
using ValantDemoApi.ValantMaze;
using Microsoft.Extensions.Logging;
using Moq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using static ValantDemoApi.Utils.MazeDemoCommons;
using ValantDemoApi.ValantMaze.Models;

namespace ValantDemoApi.Tests
{
  [TestFixture]
  public class TestsViaHttpClient
  {
    private HttpClient _client;
    private MockMazes _mockMazes;

    [OneTimeSetUp]
    public void Setup()
    {
      var factory = new APIWebApplicationFactory();
      _client = factory.CreateClient();
      _mockMazes = new MockMazes();
    }

    [Test]
    public async Task ShouldReturnAllFourDirectionsForMovementThroughMaze()
    {
      var response = await _client.GetAsync("/Maze/NextAvailableMoves");
      response.EnsureSuccessStatusCode();

      var strContent = await response.Content.ReadAsStringAsync();
      var jsonObj = JsonConvert.DeserializeObject<Movement[]>(strContent);

      var expectContent = new Movement[] {
            new Movement("Up", new Cell(-1, 0)),
            new Movement("Down", new Cell(1, 0)),
            new Movement("Left", new Cell(0, -1)),
            new Movement("Right", new Cell(0, 1)),
          };

      jsonObj.Should().BeEquivalentTo(expectContent);
    }

    [Test, Order(0)]
    public async Task ShouldReturnAllAvailableMazes()
    {
      var expectContent = new MazeResponseDto[] {
            new MazeResponseDto(_mockMazes.TestMaze1),
            new MazeResponseDto(_mockMazes.TestMaze2)
          };

      var response = await _client.GetAsync("/Maze/all");
      response.EnsureSuccessStatusCode();
      var strContent = await response.Content.ReadAsStringAsync();

      var jsonObj = JsonConvert.DeserializeObject<MazeResponseDto[]>(strContent);
      jsonObj.Should().BeEquivalentTo(expectContent);
    }

    [Test]
    public async Task ShouldReturnMazeById()
    {
      var expectContent = new MazeResponseDto(_mockMazes.TestMaze1);
      var response = await _client.GetAsync($"/Maze/{expectContent.Id}");
      response.EnsureSuccessStatusCode();
      var strContent = await response.Content.ReadAsStringAsync();
      var jsonObj = JsonConvert.DeserializeObject<MazeResponseDto>(strContent);
      jsonObj.Should().BeEquivalentTo(expectContent);


      expectContent = new MazeResponseDto(_mockMazes.TestMaze2);
      response = await _client.GetAsync($"/Maze/{expectContent.Id}");
      response.EnsureSuccessStatusCode();
      strContent = await response.Content.ReadAsStringAsync();
      jsonObj = JsonConvert.DeserializeObject<MazeResponseDto>(strContent);
      jsonObj.Should().BeEquivalentTo(expectContent);
    }

    [Test]
    public async Task ShouldCreateNewMazeAndReturnLocation()
    {

      var newMazeDto = _mockMazes.NewMazeRequest;

      var requestContent = new StringContent(JsonConvert.SerializeObject(newMazeDto), Encoding.UTF8, "application/json");

      var response = await _client.PostAsync("/Maze", requestContent);
      response.EnsureSuccessStatusCode();

      var strContent = await response.Content.ReadAsStringAsync();
      var content = JsonConvert.DeserializeObject<MazeResponseDto>(strContent);

      var expectGraph = ConverGraphStringToGraph(newMazeDto.GraphString);

      response.Headers.Location.AbsoluteUri.Should().NotBeEmpty();

      var location = response.Headers.Location.AbsoluteUri.ToString();
      var pathArray = location.Replace("http://", "").Replace("https://", "").Split("/");
      var expectId = int.Parse(pathArray[^1]);

      content.Id.Should().Equals(expectId);
      content.Start.Should().BeEquivalentTo(newMazeDto.Start);
      content.Exit.Should().BeEquivalentTo(newMazeDto.Exit);
      content.Graph.Should().BeEquivalentTo(expectGraph);
      Assert.IsNotNull(content.UploadDate);      
    }
  }

  [TestFixture]
  public class TestControllers
  {
    private MockMazes _mockMazes;
    private ILogger<MazeController> _logger;
    private Random _rnd;

    [OneTimeSetUp]
    public void Setup()
    {
      _mockMazes = new MockMazes();
      _logger = new Mock<ILogger<MazeController>>().Object;
      _rnd = new Random();
    }

    [Test]
    public void ControllerShouldReturnAllAvailableMazes()
    {
      var options = new DbContextOptionsBuilder<ApiContext>()
        .UseInMemoryDatabase(databaseName: $"TestContext{_rnd.Next()}")
        .Options;

      using (var context = new ApiContext(options))
      {
        context.Mazes.Add(_mockMazes.TestMaze1);
        context.Mazes.Add(_mockMazes.TestMaze2);
        context.SaveChanges();
      }

      using (var context = new ApiContext(options))
      {
        var mockRepository = new MazeRepository(context);
        MazeController controller = new(_logger, mockRepository);

        var actionResult = controller.GetAllMazes();
        var contentResult = (actionResult.Result as OkObjectResult).Value;        

        Assert.NotNull(contentResult);
        Assert.IsAssignableFrom<List<MazeResponseDto>>(contentResult);

        var expectContent = new MazeResponseDto[] {
            new MazeResponseDto(_mockMazes.TestMaze1),
            new MazeResponseDto(_mockMazes.TestMaze2)
          };

        var resContent = (List<MazeResponseDto>)contentResult;
        resContent.Should().BeEquivalentTo(expectContent);
      }
    }

    [Test]
    public async Task ControllerShouldReturnMazeByIdIfExists()
    {
      var options = new DbContextOptionsBuilder<ApiContext>()
        .UseInMemoryDatabase(databaseName: $"TestContext{_rnd.Next()}")
        .Options;

      using (var context = new ApiContext(options))
      {
        context.Mazes.Add(_mockMazes.TestMaze1);
        context.Mazes.Add(_mockMazes.TestMaze2);
        context.SaveChanges();
      }

      using (var context = new ApiContext(options))
      {
        var mockRepository = new MazeRepository(context);
        MazeController controller = new(_logger, mockRepository);

        var actionResult = await controller.GetMazeById(_mockMazes.TestMaze1.Id);
        var contentResult = (actionResult.Result as OkObjectResult).Value;
        
        Assert.NotNull(contentResult);
        Assert.IsAssignableFrom<MazeResponseDto>(contentResult);

        var expectContent = new MazeResponseDto(_mockMazes.TestMaze1);
        var resContent = (MazeResponseDto)contentResult;
        resContent.Should().BeEquivalentTo(expectContent);
      }
    }

    [Test]
    public async Task ControllerShouldReturnNotFoundIfMazeIdNotExists()
    {
      var options = new DbContextOptionsBuilder<ApiContext>()
        .UseInMemoryDatabase(databaseName: $"TestContext{_rnd.Next()}")
        .Options;

      using (var context = new ApiContext(options))
      {
        context.Mazes.Add(_mockMazes.TestMaze1);
        context.Mazes.Add(_mockMazes.TestMaze2);
        context.SaveChanges();
      }

      using (var context = new ApiContext(options))
      {
        var mockRepository = new MazeRepository(context);
        MazeController controller = new(_logger, mockRepository);

        var actionResult = await controller.GetMazeById(-1);

        Assert.IsInstanceOf(typeof(NotFoundObjectResult), actionResult.Result);
      }
    }

    [Test]
    public async Task ControllerShouldAddNewMazeAndReturnIt()
    {
      var options = new DbContextOptionsBuilder<ApiContext>()
        .UseInMemoryDatabase(databaseName: $"TestContext{_rnd.Next()}")
        .Options;

      using (var context = new ApiContext(options))
      {
        context.Mazes.Add(_mockMazes.TestMaze1);
        context.Mazes.Add(_mockMazes.TestMaze2);
        context.SaveChanges();
      }

      using (var context = new ApiContext(options))
      {
        var mockRepository = new MazeRepository(context);
        MazeController controller = new(_logger, mockRepository);

        var actionResult = await controller.PostNewMaze(_mockMazes.NewMazeRequest);

        Assert.IsInstanceOf(typeof(CreatedAtActionResult), actionResult.Result);

        var contentResult = (actionResult.Result as CreatedAtActionResult).Value;

        Assert.NotNull(contentResult);
        Assert.IsAssignableFrom<MazeResponseDto>(contentResult);
 
        var resContent = (MazeResponseDto)contentResult;
        var createdMaze = context.Mazes.Find(resContent.Id);
        var expectContent = new MazeResponseDto(createdMaze);
        resContent.Should().BeEquivalentTo(expectContent);
      }
    }

    [Test]
    public void ControllerShouldReturnAvailableMoves()
    {
      var options = new DbContextOptionsBuilder<ApiContext>()
        .UseInMemoryDatabase(databaseName: $"TestContext{_rnd.Next()}")
        .Options;

      using var context = new ApiContext(options);
      var mockRepository = new MazeRepository(context);
      MazeController controller = new(_logger, mockRepository);

      var movements = controller.GetNextAvailableMoves();

      Assert.NotNull(movements);
      Assert.IsAssignableFrom<List<Movement>>(movements);

      var expectContent = new List<Movement>();
      var directionDict = GetDirectionDict();

      foreach (string direction in Enum.GetNames(typeof(MoveEnum)))
      {
        expectContent.Add(new Movement(direction, directionDict[direction]));
      }

      movements.Should().BeEquivalentTo(expectContent);
    }
  }
}
