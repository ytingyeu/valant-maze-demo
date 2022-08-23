import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ValantDemoApiClient } from '../api-client/api-client';
import { StuffService } from './stuff.service';

describe('StuffService', () => {
  let service: StuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValantDemoApiClient.Client],
    });
    service = TestBed.inject(StuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
