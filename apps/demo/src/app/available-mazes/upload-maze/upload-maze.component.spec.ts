import { UploadMazeComponent } from './upload-maze.component';
import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { MazeService } from '../../_services/maze.service';
import { FormBuilder } from '@angular/forms';
import { of as _observableOf } from 'rxjs';
import { MOCK_MAZES } from '../../_models/maze/mock-mazes';
import { INewMaze } from '../../_models/maze/maze';

const mockMazeService = {
  postNewMaze: jest.fn((json: INewMaze) => _observableOf(MOCK_MAZES[0])),
};

const testFile = new File(['XOXXSXXXXX\nOOOXOOOOEX\n'], 'test-file.txt', {
  type: 'text/plain',
});

class FileReaderMock {
  DONE = FileReader.DONE;
  EMPTY = FileReader.EMPTY;
  LOADING = FileReader.LOADING;
  readyState = 0;
  error: FileReader['error'] = null;
  result: FileReader['result'] = null;
  abort = jest.fn();
  addEventListener = jest.fn();
  dispatchEvent = jest.fn();
  onabort = jest.fn();
  onerror = jest.fn();
  onload = jest.fn();
  onloadend = jest.fn();
  onloadprogress = jest.fn();
  onloadstart = jest.fn();
  onprogress = jest.fn();
  readAsArrayBuffer = jest.fn();
  readAsBinaryString = jest.fn();
  readAsDataURL = jest.fn();
  readAsText = jest.fn();
  removeEventListener = jest.fn();
}

describe('UploadMazeComponent', () => {
  let component: Shallow<UploadMazeComponent>;

  const fileReader = new FileReaderMock();
  jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

  beforeEach(() => {
    component = new Shallow(UploadMazeComponent, AppModule)
      .provideMock({ provide: FormBuilder, useClass: FormBuilder })
      .provideMock({ provide: MazeService, useValue: mockMazeService });
    jest.clearAllMocks();
  });

  it('should render UploadMaze', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('select file should send file info to property.', async () => {
    const { find, instance } = await component.render();

    const onFileSelectSpy = jest.spyOn(instance, 'onFileSelect');

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

  it('submit should trigger onSubmit.', async () => {
    const { find, outputs, instance } = await component.render();

    const onSubmitSpy = jest.spyOn(instance, 'onSubmit');

    const inputEl = find('input[name=inputFile]');

    inputEl.triggerEventHandler('change', {
      target: {
        ...inputEl.nativeElement,
        files: [testFile],
      },
    });

    find('form.upload-form').triggerEventHandler('submit', null);
    expect(onSubmitSpy).toBeCalled();
  });

  it('onSubmit should update isLoaded.', async () => {
    const { find, outputs, instance } = await component.render();

    const inputEl = find('input[name=inputFile]');

    instance.uploadForm.reset();

    inputEl.triggerEventHandler('change', {
      target: {
        ...inputEl.nativeElement,
        files: [testFile],
      },
    });

    instance.uploadForm.get('inputFile').setErrors(null);
    instance.mazeFile = testFile;

    find('form.upload-form').triggerEventHandler('ngSubmit', null);

    expect(outputs.updateIsLoaded.emit).toBeCalledWith(false);
  });

  // under working test case
  it.skip('onSubmit should read maze file.', async () => {
    const { find, instance } = await component.render();

    fileReader.result = 'XOXXSXXXXX\nOOOXOOOOEX\n';
    fileReader.addEventListener.mockImplementation((_, fn) => fn());

    const inputEl = find('input[name=inputFile]');

    instance.uploadForm.reset();

    inputEl.triggerEventHandler('change', {
      target: {
        ...inputEl.nativeElement,
        files: [testFile],
      },
    });

    instance.uploadForm.get('inputFile').setErrors(null);
    instance.mazeFile = testFile;

    find('form.upload-form').triggerEventHandler('submit', null);
    expect(fileReader.readAsText).toBeCalled();
    expect(fileReader.onload).toBeCalled();
  });
});
