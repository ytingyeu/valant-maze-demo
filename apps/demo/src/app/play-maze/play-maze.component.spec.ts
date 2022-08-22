import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMovement } from '../_models/maze/maze';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { PlayMazeComponent } from './play-maze.component';
import { ValantDemoApiClient } from '../api-client/api-client';

fdescribe('PlayMazeComponent', () => {
  let component: PlayMazeComponent;
  let fixture: ComponentFixture<PlayMazeComponent>;

  @Component({
    selector: 'valant-gamepad',
    template: '',
  })
  class MockGamepadComponent {
    @Input() availableMoveNames: string[];
    @Output() updateSelectedMove = new EventEmitter<IMovement>();
    @Output() resetGame = new EventEmitter();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayMazeComponent, MockGamepadComponent],
      imports: [RouterTestingModule, HttpClientTestingModule ],
      providers: [ValantDemoApiClient.Client],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
