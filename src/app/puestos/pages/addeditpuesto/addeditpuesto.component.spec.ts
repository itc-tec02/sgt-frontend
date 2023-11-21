import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditpuestoComponent } from './addeditpuesto.component';

describe('AddeditpuestoComponent', () => {
  let component: AddeditpuestoComponent;
  let fixture: ComponentFixture<AddeditpuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditpuestoComponent]
    });
    fixture = TestBed.createComponent(AddeditpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
