import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValantDemoApiClient } from '../api-client/api-client';

import { AvailableMazesComponent } from './available-mazes.component';

describe('AvailableMazesComponent', () => {
  let component: AvailableMazesComponent;
  let fixture: ComponentFixture<AvailableMazesComponent>;

  @Component({
    selector: 'valant-upload-maze',
    template: '',
  })
  class MockUploadComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableMazesComponent, MockUploadComponent ],
      imports: [HttpClientTestingModule],
      providers: [ValantDemoApiClient.Client],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableMazesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
