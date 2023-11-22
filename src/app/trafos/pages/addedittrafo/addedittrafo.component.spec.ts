import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedittrafoComponent } from './addedittrafo.component';

describe('AddedittrafoComponent', () => {
  let component: AddedittrafoComponent;
  let fixture: ComponentFixture<AddedittrafoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddedittrafoComponent]
    });
    fixture = TestBed.createComponent(AddedittrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
