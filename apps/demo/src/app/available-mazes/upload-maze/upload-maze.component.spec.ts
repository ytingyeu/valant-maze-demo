import { UploadMazeComponent } from './upload-maze.component';
import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { MazeService } from '../../_services/maze.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

const mockMazeService = {
  postNewMaze: jest.fn(() => of([])),
};

describe('UploadMazeComponent', () => {
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

  it('select file should send file info to property.', async () => {
    const { find, instance } = await component.render();

    const onFileSelectSpy = jest.spyOn(instance, 'onFileSelect');

    const testFile = new File(['XOXXSXXXXX\nOOOXOOOOEX\n'], 'test-file.txt', {
      type: 'text/plain',
    });

    const inputEl = find('input[name=inputFile]');

    inputEl.triggerEventHandler('change', {
      target: {
        ...inputEl.nativeElement,
        files: [testFile],
      },
    });

    expect(onFileSelectSpy).toHaveBeenCalled();
    expect(instance.mazeFile).toEqual(testFile);
  });

  it.skip('click submit.', async () => {
    const { find, outputs, instance } = await component.render();

    const testFile = new File(['XOXXSXXXXX\nOOOXOOOOEX\n'], 'test-file.txt', {
      type: 'text/plain',
    });

    const inputEl = find('input[name=inputFile]');

    inputEl.triggerEventHandler('change', {
      target: {
        ...inputEl.nativeElement,
        files: [testFile],
      },
    });

    instance.uploadForm.patchValue({ invalid: false });

    const postNewMazesSpy = jest.spyOn(UploadMazeComponent.prototype as any, 'postNewMazes');

    find('form.upload-form').triggerEventHandler('ngSubmit', null);
    //find('button[name=submit-btn]').triggerEventHandler('click', null);
    expect(postNewMazesSpy).toBeCalled();
  });
});
