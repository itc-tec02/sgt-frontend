import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrafoComponent } from './list-trafo.component';

describe('ListTrafoComponent', () => {
  let component: ListTrafoComponent;
  let fixture: ComponentFixture<ListTrafoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTrafoComponent]
    });
    fixture = TestBed.createComponent(ListTrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
