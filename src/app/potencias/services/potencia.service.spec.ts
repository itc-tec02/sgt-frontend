import { TestBed } from '@angular/core/testing';

import { PotenciaService } from './potencia.service';

describe('PotenciaService', () => {
  let service: PotenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
