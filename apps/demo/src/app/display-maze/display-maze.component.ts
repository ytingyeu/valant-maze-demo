import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'valant-display-maze',
  templateUrl: './display-maze.component.html',
  styleUrls: ['./display-maze.component.less'],
})
export class DisplayMazeComponent implements OnInit {
  @Input() graph: string[][];

  constructor() {}

  ngOnInit(): void {}
}
