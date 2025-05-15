import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuantityDialogComponent } from './edit-quantity-dialog.component';

describe('EditQuantityDialogComponent', () => {
  let component: EditQuantityDialogComponent;
  let fixture: ComponentFixture<EditQuantityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQuantityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuantityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
