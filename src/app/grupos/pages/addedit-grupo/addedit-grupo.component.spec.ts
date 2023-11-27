import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditGrupoComponent } from './addedit-grupo.component';

describe('AddeditGrupoComponent', () => {
  let component: AddeditGrupoComponent;
  let fixture: ComponentFixture<AddeditGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditGrupoComponent]
    });
    fixture = TestBed.createComponent(AddeditGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
