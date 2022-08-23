import { Injectable } from '@angular/core';
import { Observable, of as _observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMaze, IMovement, INewMaze } from '../_models/maze/maze';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  getListOfMazes(): Observable<IMaze|IMaze[]> {
    return this.httpClient.getListOfMazes();
  }

  getMazeById(id: number): Observable<IMaze|IMaze[]> {
    return this.httpClient.getMazeById(id);
  }

  postNewMaze(json: INewMaze): Observable<IMaze|IMaze[]> {
    return this.httpClient.postNewMaze(json);
  }

  getNextAvailableMoves(): Observable<IMovement[]> {
    return this.httpClient.getNextMovements();
  }
}
