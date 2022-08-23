import { PlayMazeComponent } from './play-maze.component';
import { Shallow } from 'shallow-render';
import { AppModule } from '../app.module';
import { MazeService } from '../_services/maze.service';
import { ActivatedRoute } from '@angular/router';
import { of as _observableOf } from 'rxjs';
import { MOCK_MAZES, VALID_MOVEMENTS } from '../_models/maze/mock-mazes';

const mockMaze = MOCK_MAZES[0];

const mockRoute = {
  snapshot: {
    paramMap: {
      get: (_key: string) => {
        return mockMaze.id;
      },
    },
  },
};

const mockMazeService = {
  getMazeById: jest.fn((id: number) => _observableOf(MOCK_MAZES.find((x) => x.id === id))),
  getNextAvailableMoves: jest.fn(() => _observableOf(VALID_MOVEMENTS)),
};

describe('Test PlayMazeComponent', () => {
  let component: Shallow<PlayMazeComponent>;

  beforeEach(() => {
    component = new Shallow(PlayMazeComponent, AppModule)
      .provideMock({ provide: ActivatedRoute, useValue: mockRoute })
      .provideMock({ provide: MazeService, useValue: mockMazeService });
    jest.clearAllMocks();
  });

  it('should render PlayMazeComponent', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('shoud call service to fetch maze by ID on init', async () => {
    await component.render();
    expect(mockMazeService.getMazeById).toHaveBeenCalledWith(mockMaze.id);
  });

  it('shoud call service to fetch available moves on init', async () => {
    await component.render();
    expect(mockMazeService.getNextAvailableMoves).toHaveBeenCalled();
  });

  it('should contain display of maze', async () => {
    const { find } = await component.render();
    expect(find('.display-maze')).toHaveFoundOne;
  });

  it('should contain display of gamepad', async () => {
    const { find } = await component.render();
    expect(find('.gamepad')).toHaveFoundOne;
  });
});
