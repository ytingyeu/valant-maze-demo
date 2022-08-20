import { Component, OnInit } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
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
  isLoaded: boolean = false;

  constructor(private logger: LoggingService, private route: ActivatedRoute, private mazeService: MazeService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getMaze(id);
  }

  private getMaze(id: number): void {
    this.mazeService.getMazeById(id).subscribe({
      next: (maze: IMaze) => {
        this.maze = maze;
        this.isLoaded = true;
      },
      error: (error) => {
        this.logger.error('Error getting mazes: ', error);
      },
    });
  }
}
