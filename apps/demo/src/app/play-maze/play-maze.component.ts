import { Component, Input, OnInit } from '@angular/core';
import { ICell, IMaze, IMovement } from '../_models/maze/maze';
import { ActivatedRoute } from '@angular/router';
import { MazeService } from '../_services/maze.service';
import { LoggingService } from '../logging/logging.service';

@Component({
  selector: 'valant-play-maze',
  templateUrl: './play-maze.component.html',
  styleUrls: ['./play-maze.component.less'],
})
export class PlayMazeComponent implements OnInit {
  maze: IMaze | undefined;
  graph: string[][];
  isLoaded: boolean = false;
  currPos: ICell;
  availableMoves: IMovement[];

  constructor(private logger: LoggingService, private route: ActivatedRoute, private mazeService: MazeService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.initMaze(id);
  }

  private initMaze(id: number): void {
    this.mazeService.getMazeById(id).subscribe({
      next: (maze: IMaze) => {
        // console.log(maze);
        this.maze = maze;
        this.graph = maze.graph;
        this.currPos = {
          row: maze.start.row,
          col: maze.start.col,
        };

        this.getNextAvailableMoves();
      },
      error: (error) => {
        this.logger.error('Error getting mazes: ', error);
      },
    });
  }

  private getNextAvailableMoves() {
    this.mazeService.getNextAvailableMoves(this.maze.id, this.currPos).subscribe({
      next: (resNextMoves: IMovement[]) => {
        this.availableMoves = resNextMoves;
        this.isLoaded = true;
      },
      error: (error) => {
        this.logger.error('Error getting next availabe moves: ', error);
      },
    });
  }

  updateSelectedMove(nextMoveName: string) {
    console.log(`Parent receives ${nextMoveName}`);
    const movement = this.availableMoves.find((movement) => movement.name === nextMoveName);
    console.log(movement);

    const newPos = {
      row: this.currPos.row + movement.direction.row,
      col: this.currPos.col + movement.direction.col,
    };

    this.graph[this.currPos.row][this.currPos.col] = 'O';
    this.graph[newPos.row][newPos.col] = 'C';
    this.currPos = newPos;
    this.getNextAvailableMoves();
  }
}
