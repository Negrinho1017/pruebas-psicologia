import { TestBed, inject } from '@angular/core/testing';

import { HojaDeSubpruebasService } from './hoja-de-subpruebas.service';

describe('HojaDeSubpruebasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HojaDeSubpruebasService]
    });
  });

  it('should be created', inject([HojaDeSubpruebasService], (service: HojaDeSubpruebasService) => {
    expect(service).toBeTruthy();
  }));
});
