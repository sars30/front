import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLoteComponent } from './add-edit-lote.component';

describe('AddEditLoteComponent', () => {
  let component: AddEditLoteComponent;
  let fixture: ComponentFixture<AddEditLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLoteComponent]
    });
    fixture = TestBed.createComponent(AddEditLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
