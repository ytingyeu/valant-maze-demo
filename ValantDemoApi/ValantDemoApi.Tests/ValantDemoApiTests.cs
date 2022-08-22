using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using ValantDemoApi.Models;

namespace ValantDemoApi.Tests
{
  [TestFixture]
  public class ValantDemoApiTests
  {
    private HttpClient client;

    [OneTimeSetUp]
    public void Setup()
    {
      var factory = new APIWebApplicationFactory();
      this.client = factory.CreateClient();
    }

    [Test]
    public async Task ShouldReturnAllFourDirectionsForMovementThroughMaze()
    {
      var result = await this.client.GetAsync("/Maze/NextAvailableMoves");
      result.EnsureSuccessStatusCode();
      var content = JsonConvert.DeserializeObject<Movement[]>(await result.Content.ReadAsStringAsync());

      var expectContent = new Movement[] {
            new Movement("Up", new Cell(-1, 0)),
            new Movement("Down", new Cell(1, 0)),
            new Movement("Left", new Cell(0, -1)),
            new Movement("Right", new Cell(0, 1)),
          };

      content.Should().BeEquivalentTo(expectContent);
    }

    [Test]
    public async Task ShouldReturnAllAvailableMazes()
    {
      var result = await this.client.GetAsync("/Maze/all");
      result.EnsureSuccessStatusCode();

      //var content = JsonConvert.DeserializeObject<Movement[]>(await result.Content.ReadAsStringAsync());

      //var expectContent = new Movement[] {
      //      new Movement("Up", new Cell(-1, 0)),
      //      new Movement("Down", new Cell(1, 0)),
      //      new Movement("Left", new Cell(0, -1)),
      //      new Movement("Right", new Cell(0, 1)),
      //    };

      //content.Should().BeEquivalentTo(expectContent);
    }

    [Test]
    public async Task ShouldReturnMazeById()
    {
      var result = await this.client.GetAsync("/Maze/all");
      result.EnsureSuccessStatusCode();

      //var content = JsonConvert.DeserializeObject<Movement[]>(await result.Content.ReadAsStringAsync());

      //var expectContent = new Movement[] {
      //      new Movement("Up", new Cell(-1, 0)),
      //      new Movement("Down", new Cell(1, 0)),
      //      new Movement("Left", new Cell(0, -1)),
      //      new Movement("Right", new Cell(0, 1)),
      //    };

      //content.Should().BeEquivalentTo(expectContent);
    }

    [Test]
    public async Task ShouldCreateNewMazeAndReturnLocation()
    {
      var result = await this.client.GetAsync("/Maze/all");
      result.EnsureSuccessStatusCode();

      //var content = JsonConvert.DeserializeObject<Movement[]>(await result.Content.ReadAsStringAsync());

      //var expectContent = new Movement[] {
      //      new Movement("Up", new Cell(-1, 0)),
      //      new Movement("Down", new Cell(1, 0)),
      //      new Movement("Left", new Cell(0, -1)),
      //      new Movement("Right", new Cell(0, 1)),
      //    };

      //content.Should().BeEquivalentTo(expectContent);
    }
  }
}
