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
  isLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private mazeService: MazeService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mazeService.getMazeById(id).subscribe((maze) => {
      console.log(maze);
      // maze.graphString.replace('S', 'C');
      this.isLoaded = true;
      this.maze = maze;
    });
  }
}
