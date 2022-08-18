import { Component, OnInit } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
import { ActivatedRoute } from '@angular/router';
import { MazeService } from '../_services/maze.service';

@Component({
  selector: 'valant-play-maze',
  templateUrl: './play-maze.component.html',
  styleUrls: ['./play-maze.component.less'],
})
export class PlayMazeComponent implements OnInit {
  maze: IMaze | undefined;

  constructor(private route: ActivatedRoute, private mazeService: MazeService) {}

  ngOnInit(): void {
    this.getMaze();
    console.log(this.maze);
  }

  getMaze() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mazeService.getSingleMaze(id).subscribe((mazes) => (this.maze = mazes));
  }
}
