import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRolComponent } from './add-edit-rol.component';

describe('AddEditRolComponent', () => {
  let component: AddEditRolComponent;
  let fixture: ComponentFixture<AddEditRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditRolComponent]
    });
    fixture = TestBed.createComponent(AddEditRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
