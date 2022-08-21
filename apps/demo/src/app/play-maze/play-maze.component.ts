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
  currPos: ICell;
  exit: ICell;
  graph: string[][];
  availableMoves: IMovement[];
  isLoaded: boolean = false;
  succeed: boolean = false;

  constructor(private logger: LoggingService, private route: ActivatedRoute, private mazeService: MazeService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.initMaze(id);
    this.getNextAvailableMoves();
  }

  updateSelectedMove(nextMoveName: string) {
    const movement = this.availableMoves.find((movement) => movement.name === nextMoveName);
    this.performMove(movement);
  }

  private initMaze(id: number): void {
    this.mazeService.getMazeById(id).subscribe({
      next: (maze: IMaze) => {
        // console.log(maze);
        this.exit = maze.exit;
        this.graph = maze.graph;
        this.currPos = maze.start;
        this.isLoaded = true;
      },
      error: (error) => {
        this.logger.error('Error getting mazes: ', error);
      },
    });
  }

  private getNextAvailableMoves() {
    this.mazeService.getNextAvailableMoves().subscribe({
      next: (resNextMoves: IMovement[]) => {
        this.availableMoves = resNextMoves;
      },
      error: (error) => {
        this.logger.error('Error getting next availabe moves: ', error);
      },
    });
  }

  private performMove(movement: IMovement): void {
    const newPos = {
      row: this.currPos.row + movement.direction.row,
      col: this.currPos.col + movement.direction.col,
    };

    if (this.isValidMove(newPos)) {
      this.graph[this.currPos.row][this.currPos.col] = 'O';
      this.graph[newPos.row][newPos.col] = 'C';
      this.currPos = newPos;
    }

    if (this.currPos.row === this.exit.row && this.currPos.col === this.exit.col) {
      this.succeed = true;
    }
  }

  private isValidMove(newPos: ICell): boolean {
    const numOfRows = this.graph.length;
    const numOfCols = this.graph[0].length;

    const row = newPos.row;
    const col = newPos.col;

    if (row < 0 || row >= numOfRows) {
      return false;
    }

    if (col < 0 || col >= numOfCols) {
      return false;
    }

    if (this.graph[row][col] == 'X') {
      return false;
    }

    return true;
  }
}
