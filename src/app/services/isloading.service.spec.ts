import { TestBed } from '@angular/core/testing';

import { IsloadingService } from './isloading.service';

describe('IsloadingService', () => {
  let service: IsloadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsloadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
