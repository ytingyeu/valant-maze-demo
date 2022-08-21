import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovement } from '../../_models/maze/maze';

@Component({
  selector: 'valant-gamepad',
  templateUrl: './gamepad.component.html',
  styleUrls: ['./gamepad.component.less'],
})
export class GamepadComponent implements OnInit {
  @Input() availableMoveNames: string[];
  @Output() updateSelectedMove = new EventEmitter<IMovement>();

  constructor() {}

  ngOnInit(): void {}

  onMoveClick(event: any) {
    this.updateSelectedMove.emit(event.target.name);
  }
}
