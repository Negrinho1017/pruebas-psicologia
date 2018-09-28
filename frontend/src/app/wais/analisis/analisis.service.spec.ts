import { TestBed, inject } from '@angular/core/testing';

import { AnalisisService } from './analisis.service';

describe('AnalisisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalisisService]
    });
  });

  it('should be created', inject([AnalisisService], (service: AnalisisService) => {
    expect(service).toBeTruthy();
  }));
});
