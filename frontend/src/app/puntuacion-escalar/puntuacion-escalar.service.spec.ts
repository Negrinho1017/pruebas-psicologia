import { TestBed, inject } from '@angular/core/testing';

import { PuntuacionEscalarService } from './puntuacion-escalar.service';

describe('PuntuacionEscalarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuntuacionEscalarService]
    });
  });

  it('should be created', inject([PuntuacionEscalarService], (service: PuntuacionEscalarService) => {
    expect(service).toBeTruthy();
  }));
});
