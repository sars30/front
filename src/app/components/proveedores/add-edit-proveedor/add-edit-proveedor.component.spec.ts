import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProveedorComponent } from './add-edit-proveedor.component';

describe('AddEditProveedorComponent', () => {
  let component: AddEditProveedorComponent;
  let fixture: ComponentFixture<AddEditProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProveedorComponent]
    });
    fixture = TestBed.createComponent(AddEditProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
