import { TestBed, inject } from '@angular/core/testing';

import { VocabularioService } from './vocabulario.service';

describe('VocabularioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VocabularioService]
    });
  });

  it('should be created', inject([VocabularioService], (service: VocabularioService) => {
    expect(service).toBeTruthy();
  }));
});
