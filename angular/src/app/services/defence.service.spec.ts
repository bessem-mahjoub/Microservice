import { TestBed } from '@angular/core/testing';

import { DefenceService } from './defence.service';

describe('DefenceService', () => {
  let service: DefenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
