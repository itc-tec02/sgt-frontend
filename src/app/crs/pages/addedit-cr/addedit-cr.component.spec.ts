import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditCrComponent } from './addedit-cr.component';

describe('AddeditCrComponent', () => {
  let component: AddeditCrComponent;
  let fixture: ComponentFixture<AddeditCrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditCrComponent]
    });
    fixture = TestBed.createComponent(AddeditCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
