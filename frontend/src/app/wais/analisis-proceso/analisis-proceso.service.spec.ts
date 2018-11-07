import { TestBed, inject } from '@angular/core/testing';

import { AnalisisProcesoService } from './analisis-proceso.service';

describe('AnalisisProcesoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalisisProcesoService]
    });
  });

  it('should be created', inject([AnalisisProcesoService], (service: AnalisisProcesoService) => {
    expect(service).toBeTruthy();
  }));
});
