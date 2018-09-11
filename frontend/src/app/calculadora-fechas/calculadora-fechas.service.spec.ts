import { TestBed, inject } from '@angular/core/testing';

import { CalculadoraFechasService } from './calculadora-fechas.service';

describe('CalculadoraFechasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculadoraFechasService]
    });
  });

  it('should be created', inject([CalculadoraFechasService], (service: CalculadoraFechasService) => {
    expect(service).toBeTruthy();
  }));
});
