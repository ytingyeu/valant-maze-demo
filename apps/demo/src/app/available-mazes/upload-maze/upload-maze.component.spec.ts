import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMazeComponent } from './upload-maze.component';

describe('UploadMazeComponent', () => {
  let component: UploadMazeComponent;
  let fixture: ComponentFixture<UploadMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
