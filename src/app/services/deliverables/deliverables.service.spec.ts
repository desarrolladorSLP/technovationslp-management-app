import { TestBed } from '@angular/core/testing';

import { DeliverablesService } from './deliverables.service';

describe('DeliverablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliverablesService = TestBed.get(DeliverablesService);
    expect(service).toBeTruthy();
  });
});
