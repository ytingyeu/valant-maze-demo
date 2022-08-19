import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMazeComponent } from './display-maze.component';

describe('DisplayMazeComponent', () => {
  let component: DisplayMazeComponent;
  let fixture: ComponentFixture<DisplayMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
