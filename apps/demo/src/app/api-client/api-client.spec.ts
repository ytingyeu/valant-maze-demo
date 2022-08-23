import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ValantDemoApiClient } from '../api-client/api-client';
import { MOCK_MAZES, NEW_MAZE_REQ, VALID_MOVEMENTS } from '../_models/maze/mock-mazes';
import { HttpClient } from '@angular/common/http';

const mockMaze = MOCK_MAZES[0];

describe('ApiClient', () => {
  let apiClient: ValantDemoApiClient.Client;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ValantDemoApiClient.Client,
          useClass: ValantDemoApiClient.Client,
        },
        {
          provide: ValantDemoApiClient.API_BASE_URL,
          useValue: ValantDemoApiClient.API_BASE_URL,
        },
      ],
    });

    apiClient = TestBed.inject(ValantDemoApiClient.Client);
    baseUrl = TestBed.inject(ValantDemoApiClient.API_BASE_URL);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('ValantDemoApiClient should be created', () => {
    expect(apiClient).toBeTruthy();
  });

  it('getListOfMazes should make GET requesut to fetch a list of mazes.', () => {
    apiClient.getListOfMazes().subscribe((response) => {
      expect(response).toEqual(MOCK_MAZES);
    });

    const req = httpMock.expectOne(`${baseUrl}/Maze/all`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_MAZES);
  });

  it('getMazeById should make GET requesut to fetch a maze by Id.', () => {
    apiClient.getMazeById(mockMaze.id).subscribe((response) => {
      expect(response).toEqual(mockMaze);
    });

    const req = httpMock.expectOne(`${baseUrl}/Maze/${mockMaze.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMaze);
  });

  it('postNewMaze should make POST requesut to create a maze.', () => {
    apiClient.postNewMaze(NEW_MAZE_REQ).subscribe((response) => {
      expect(response).toEqual(mockMaze);
    });

    const req = httpMock.expectOne(`${baseUrl}/Maze`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(NEW_MAZE_REQ);
    req.flush(mockMaze);
  });

  it('getNextMovements should make GET requesut to fetch available moves.', () => {
    apiClient.getNextMovements().subscribe((response) => {
      expect(response).toEqual(VALID_MOVEMENTS);
    });

    const req = httpMock.expectOne(`${baseUrl}/Maze/NextAvailableMoves`);
    expect(req.request.method).toBe('GET');
    req.flush(VALID_MOVEMENTS);
  });
});
