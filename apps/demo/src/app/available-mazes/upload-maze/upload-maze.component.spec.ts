import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValantDemoApiClient } from '../../api-client/api-client';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UploadMazeComponent } from './upload-maze.component';
import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { MazeService } from '../../_services/maze.service';
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

  it.skip('select file should send file info to property.', async () => {
    const { find, outputs, instance } = await component.render();

    find('form.inputFile').triggerEventHandler('ngSubmit', {});
    const onFileSelectSpy = jest.spyOn(instance, 'onFileSelect');
    expect(onFileSelectSpy).toHaveBeenCalled();
  });
});
