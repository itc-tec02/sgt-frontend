import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditPotenciasComponent } from './add-or-edit-potencias.component';

describe('AddOrEditPotenciasComponent', () => {
  let component: AddOrEditPotenciasComponent;
  let fixture: ComponentFixture<AddOrEditPotenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditPotenciasComponent]
    });
    fixture = TestBed.createComponent(AddOrEditPotenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
