import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotenciasComponent } from './potencias.component';

describe('PotenciasComponent', () => {
  let component: PotenciasComponent;
  let fixture: ComponentFixture<PotenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PotenciasComponent]
    });
    fixture = TestBed.createComponent(PotenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
