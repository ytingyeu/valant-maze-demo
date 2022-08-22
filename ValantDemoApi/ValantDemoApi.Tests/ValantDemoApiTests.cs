using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using FluentAssertions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NUnit.Framework;
using ValantDemoApi.MockData;
using ValantDemoApi.Models;
using ValantDemoApi.Shared;

namespace ValantDemoApi.Tests
{
  [TestFixture]
  public class ValantDemoApiTests
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

      int expectId = ShareFunctions.GetLastCreatedMockMazeId();
      var expectGraph = ShareFunctions.ConverGraphStringToGraph(newMazeDto.GraphString);

      response.Headers.Location.AbsoluteUri.Should().Contain($"/Maze/{expectId}");
      content.Id.Should().Equals(expectId);
      content.Start.Should().BeEquivalentTo(newMazeDto.Start);
      content.Exit.Should().BeEquivalentTo(newMazeDto.Exit);
      content.Graph.Should().BeEquivalentTo(expectGraph);
      Assert.IsNotNull(content.UploadDate);
      Assert.IsNotEmpty(content.UploadDate);
    }
  }
}
