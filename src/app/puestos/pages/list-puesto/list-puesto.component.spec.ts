import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPuestoComponent } from './list-puesto.component';

describe('ListPuestoComponent', () => {
  let component: ListPuestoComponent;
  let fixture: ComponentFixture<ListPuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPuestoComponent]
    });
    fixture = TestBed.createComponent(ListPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
