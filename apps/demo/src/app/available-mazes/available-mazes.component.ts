import { Component, OnInit } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
import { MazeService } from '../_services/maze.service';

@Component({
  selector: 'valant-available-mazes',
  templateUrl: './available-mazes.component.html',
  styleUrls: ['./available-mazes.component.less'],
})
export class AvailableMazesComponent implements OnInit {
  listOfMazes: IMaze[] = [];

  constructor(private mazeService: MazeService) {}

  ngOnInit(): void {
    this.getMazes();
  }

  getMazes() {
    this.mazeService.getListOfMazes().subscribe((mazes) => (this.listOfMazes = mazes));
  }
}
