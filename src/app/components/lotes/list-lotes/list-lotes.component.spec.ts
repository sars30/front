import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLotesComponent } from './list-lotes.component';

describe('ListLotesComponent', () => {
  let component: ListLotesComponent;
  let fixture: ComponentFixture<ListLotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLotesComponent]
    });
    fixture = TestBed.createComponent(ListLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
