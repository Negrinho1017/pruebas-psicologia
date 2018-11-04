import { TestBed, inject } from '@angular/core/testing';

import { FortalezasDebilidadesService } from './fortalezas-debilidades.service';

describe('FortalezasDebilidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FortalezasDebilidadesService]
    });
  });

  it('should be created', inject([FortalezasDebilidadesService], (service: FortalezasDebilidadesService) => {
    expect(service).toBeTruthy();
  }));
});
