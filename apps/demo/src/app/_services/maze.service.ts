import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IMaze } from '../_models/maze/maze';
import { MOCK_MAZES } from '../_models/maze/mock-mazes';
import { HttpClient } from '@angular/common/http';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  private _apiClient: ValantDemoApiClient.Client;

  constructor(private http: HttpClient, private apiClient: ValantDemoApiClient.Client) {
    this._apiClient = apiClient;
  }

  getListOfMazes(): Observable<any> {
    return this._apiClient.getListOfMazes();
  }

  getMazeById(id: number): Observable<IMaze> {
    const res = this._apiClient.getMazeById(id);
    // console.log(res);
    return res;
  }
}
