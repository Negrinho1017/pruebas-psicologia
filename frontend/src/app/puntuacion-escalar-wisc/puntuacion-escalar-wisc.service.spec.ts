import { TestBed, inject } from '@angular/core/testing';

import { PuntuacionEscalarWiscService } from './puntuacion-escalar-wisc.service';

describe('PuntuacionEscalarWiscService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuntuacionEscalarWiscService]
    });
  });

  it('should be created', inject([PuntuacionEscalarWiscService], (service: PuntuacionEscalarWiscService) => {
    expect(service).toBeTruthy();
  }));
});
