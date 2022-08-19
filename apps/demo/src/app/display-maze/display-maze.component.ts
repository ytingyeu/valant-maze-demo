import { Component, OnInit, Input } from '@angular/core';
import { IMaze } from '../_models/maze/maze';

@Component({
  selector: 'valant-display-maze',
  templateUrl: './display-maze.component.html',
  styleUrls: ['./display-maze.component.less'],
})
export class DisplayMazeComponent implements OnInit {
  @Input() maze!: IMaze;
  graph: string[][] = [];

  constructor() {}

  ngOnInit(): void {
    let json = JSON.parse(this.maze.graphString);
    this.graph = json.graph;

    // this.maze.graphString.split('#').forEach((row) => {
    //   this.graph.push(row.split(''));
    // });
  }
}
