import { TestBed } from '@angular/core/testing';

import { FarmingSolutionService } from './farming-solution.service';

describe('FarmingSolutionService', () => {
  let service: FarmingSolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmingSolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
