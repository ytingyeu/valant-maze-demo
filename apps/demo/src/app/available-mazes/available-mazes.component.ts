import { Component, OnInit } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
import { MAZES } from '../_models/maze/mock-mazes';
import { CharToMazePipe } from '../_pipes/char-to-maze.pipe';

@Component({
  selector: 'valant-available-mazes',
  templateUrl: './available-mazes.component.html',
  styleUrls: ['./available-mazes.component.less'],
})
export class AvailableMazesComponent implements OnInit {
  listOfMazes: IMaze[] = MAZES;

  constructor() {}

  ngOnInit(): void {}
}
