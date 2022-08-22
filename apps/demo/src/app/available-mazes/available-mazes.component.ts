import { Component, OnInit } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
import { MazeService } from '../_services/maze.service';
import { LoggingService } from '../logging/logging.service';

@Component({
  selector: 'valant-available-mazes',
  templateUrl: './available-mazes.component.html',
  styleUrls: ['./available-mazes.component.less'],
})
export class AvailableMazesComponent implements OnInit {
  listOfMazes: IMaze[] = [];
  isLoaded: boolean = false;

  constructor(private logger: LoggingService, private mazeService: MazeService) {}

  ngOnInit(): void {
    this.getMazes();
  }

  updateIsLoaded(newState: boolean) {
    this.isLoaded = newState;
  }

  updateListOfMazes(newMazes: IMaze[]) {
    this.listOfMazes = [...newMazes];
    this.isLoaded = true;
  }

  private getMazes(): void {
    this.mazeService.getListOfMazes().subscribe({
      next: (mazes: IMaze[]) => {
        this.listOfMazes = mazes;
        this.isLoaded = true;
      },
      error: (error) => {
        this.logger.error('Error getting mazes: ', error);
        console.error(error);
      },
    });
  }
}
