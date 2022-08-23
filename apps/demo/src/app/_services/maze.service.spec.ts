import { TestBed } from '@angular/core/testing';
import { MazeService } from './maze.service';
import { ValantDemoApiClient } from '../api-client/api-client';
import { MOCK_MAZES, NEW_MAZE_REQ } from '../_models/maze/mock-mazes';
import { IMaze, INewMaze, IMovement } from '../_models/maze/maze';

class MockClient {
  getListOfMazes(): IMaze[] {
    return [];
  }

  getMazeById(id: number) {
    return MOCK_MAZES.find((x) => x.id === id);
  }

  postNewMaze(_: INewMaze) {
    return MOCK_MAZES[0];
  }

  getNextMovements(): IMovement[] {
    return [];
  }
}

describe('MazeService', () => {
  let service: MazeService;
  let client: ValantDemoApiClient.Client;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ValantDemoApiClient.Client,
          useValue: new MockClient(),
        },
      ],
    });
    service = TestBed.inject(MazeService);
    client = TestBed.inject(ValantDemoApiClient.Client);
  });

  it('MazeService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getListOfMazes should call api client to get a list of mazes.', () => {
    const spyClient = jest.spyOn(client, 'getListOfMazes');
    service.getListOfMazes();
    expect(spyClient).toBeCalled();
  });

  it('getMazeById should call api client with maze id passed.', () => {
    const spyClient = jest.spyOn(client, 'getMazeById');
    service.getMazeById(MOCK_MAZES[0].id);
    service.getMazeById(MOCK_MAZES[1].id);

    expect(spyClient).toBeCalledWith(MOCK_MAZES[0].id);
    expect(spyClient).toBeCalledWith(MOCK_MAZES[1].id);
  });

  it('postNewMaze should call api client with pass POST request passed.', () => {    
    const spyClient = jest.spyOn(client, 'postNewMaze');
    service.postNewMaze(NEW_MAZE_REQ);
    expect(spyClient).toBeCalledWith(NEW_MAZE_REQ);
  });

  it('getNextMovements should call api client to get available moves.', () => {
    const spyClient = jest.spyOn(client, 'getNextMovements');
    service.getNextAvailableMoves();
    expect(spyClient).toBeCalled();
  });
});
