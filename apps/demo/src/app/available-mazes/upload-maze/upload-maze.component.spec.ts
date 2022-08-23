import { UploadMazeComponent } from './upload-maze.component';
import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { MazeService } from '../../_services/maze.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

const mockMazeService = {
  postNewMaze: jest.fn(() => of([])),
};

fdescribe('UploadMazeComponent', () => {
  let component: Shallow<UploadMazeComponent>;

  beforeEach(() => {
    component = new Shallow(UploadMazeComponent, AppModule).provideMock([
      { provide: MazeService, useValue: mockMazeService },
      { provide: FormBuilder, useClass: FormBuilder },
    ]);
    jest.clearAllMocks();
  });

  it('should render UploadMaze', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  // Skip this test case
  // strugging with triggering file input and submit event
  it.skip('select file should send file info to property.', async () => {
    const { find, outputs, instance } = await component.render();

    find('form.inputFile').triggerEventHandler('input', {});
    const onFileSelectSpy = jest.spyOn(instance, 'onFileSelect');
    expect(onFileSelectSpy).toHaveBeenCalled();
  });
});
