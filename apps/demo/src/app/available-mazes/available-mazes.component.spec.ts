import { Shallow } from 'shallow-render';
import { AppModule } from '../app.module';
import { of } from 'rxjs';

import { AvailableMazesComponent } from './available-mazes.component';
import { MazeService } from '../_services/maze.service';
import { MOCK_MAZES } from '../_models/maze/mock-mazes';

const mockMazeService = {
  getListOfMazes: jest.fn(() => of(MOCK_MAZES)),
};

describe('AvailableMazesComponent', () => {
  let component: Shallow<AvailableMazesComponent>;

  beforeEach(() => {
    component = new Shallow(AvailableMazesComponent, AppModule)
      // .provideMock({ provide: StuffService, useValue: mockStuffService })
      // .provideMock({ provide: LoggingService, useClass: SilentLogger });
      .provideMock({ provide: MazeService, useValue: mockMazeService });
    jest.clearAllMocks();
  });

  it('should render available mazes', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('shoud call service to fetch mazes on init', async () => {
    await component.render();
    expect(mockMazeService.getListOfMazes).toHaveBeenCalledTimes(1);
  });

  it('shoud render mazes after fetch data on init', async () => {
    const { find } = await component.render();
    expect(find('.maze-entity')).toHaveFoundMoreThan(0);
  });
});
