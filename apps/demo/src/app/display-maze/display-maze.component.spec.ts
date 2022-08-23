import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { AppModule } from '../app.module';
import { MOCK_MAZES } from '../_models/maze/mock-mazes';

import { DisplayMazeComponent } from './display-maze.component';

describe('Test DisplayMazeComponent', () => {
  let component: Shallow<DisplayMazeComponent>;

  beforeEach(() => {
    component = new Shallow(DisplayMazeComponent, AppModule);
    jest.clearAllMocks();
  });

  it('should render DisplayMaze', async () => {
    const rendering = await component.render({
      bind: {
        graph: MOCK_MAZES[0].graph,
      },
    });
    expect(rendering).toBeTruthy();
  });  
});
