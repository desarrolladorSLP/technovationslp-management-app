import { TestBed } from '@angular/core/testing';

import { DataAPIService } from './data-api.service';

describe('DataAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAPIService = TestBed.get(DataAPIService);
    expect(service).toBeTruthy();
  });
});
