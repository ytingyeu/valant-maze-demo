import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowLoadingComponent } from './now-loading.component';

describe('NowLoadingComponent', () => {
  let component: NowLoadingComponent;
  let fixture: ComponentFixture<NowLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NowLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
