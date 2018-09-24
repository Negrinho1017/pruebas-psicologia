import { TestBed, inject } from '@angular/core/testing';

import { HojaDeResultadosService } from './hoja-de-resultados.service';

describe('HojaDeResultadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HojaDeResultadosService]
    });
  });

  it('should be created', inject([HojaDeResultadosService], (service: HojaDeResultadosService) => {
    expect(service).toBeTruthy();
  }));
});
