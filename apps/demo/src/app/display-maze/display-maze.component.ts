import { Component, OnInit, Input } from '@angular/core';
import { IMaze } from '../_models/maze/maze';

@Component({
  selector: 'valant-display-maze',
  templateUrl: './display-maze.component.html',
  styleUrls: ['./display-maze.component.less'],
})
export class DisplayMazeComponent implements OnInit {
  @Input() maze!: IMaze;

  constructor() {}

  ngOnInit(): void {}
}
