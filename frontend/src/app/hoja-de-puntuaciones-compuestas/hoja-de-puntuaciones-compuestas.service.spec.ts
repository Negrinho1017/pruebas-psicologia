import { TestBed, inject } from '@angular/core/testing';

import { HojaDePuntuacionesCompuestasService } from './hoja-de-puntuaciones-compuestas.service';

describe('HojaDePuntuacionesCompuestasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HojaDePuntuacionesCompuestasService]
    });
  });

  it('should be created', inject([HojaDePuntuacionesCompuestasService], (service: HojaDePuntuacionesCompuestasService) => {
    expect(service).toBeTruthy();
  }));
});
