import { Component, OnInit, Input } from '@angular/core';
import { IMaze } from '../_models/maze/maze';
import { Utils } from '../_Utils/utils';

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
    this.graph = Utils.ConvertGraphStringToList(this.maze.graphString);
  }
}
