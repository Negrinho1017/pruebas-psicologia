import { TestBed, inject } from '@angular/core/testing';

import { HojaDePruebasService } from './hoja-de-pruebas.service';

describe('HojaDePruebasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HojaDePruebasService]
    });
  });

  it('should be created', inject([HojaDePruebasService], (service: HojaDePruebasService) => {
    expect(service).toBeTruthy();
  }));
});
