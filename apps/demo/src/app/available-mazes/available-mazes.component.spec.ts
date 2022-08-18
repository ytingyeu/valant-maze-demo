import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableMazesComponent } from './available-mazes.component';

describe('AvailableMazesComponent', () => {
  let component: AvailableMazesComponent;
  let fixture: ComponentFixture<AvailableMazesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableMazesComponent ]
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
