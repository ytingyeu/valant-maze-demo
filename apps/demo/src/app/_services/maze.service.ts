import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaze, IMovement, INewMaze } from '../_models/maze/maze';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  getListOfMazes(): Observable<IMaze[]> {
    return this.httpClient.getListOfMazes();
  }

  getMazeById(id: number): Observable<IMaze> {
    return this.httpClient.getMazeById(id);
  }

  postNewMaze(json: INewMaze): Observable<IMaze> {
    return this.httpClient.postNewMaze(json);
  }

  getNextAvailableMoves(): Observable<IMovement[]> {
    return this.httpClient.getNextMovements();
  }
}
