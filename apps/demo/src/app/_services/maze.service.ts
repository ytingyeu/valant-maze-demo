import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMaze } from '../_models/maze/maze';
import { MOCK_MAZES } from '../_models/maze/mock-mazes';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  constructor() {}

  getListOfMazes(): Observable<IMaze[]> {
    const listOfMazes = of(MOCK_MAZES);
    return listOfMazes;
  }
}
