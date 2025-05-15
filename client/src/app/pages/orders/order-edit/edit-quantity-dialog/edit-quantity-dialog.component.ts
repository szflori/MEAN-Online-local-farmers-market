import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-quantity-dialog',
  standalone: false,
  templateUrl: './edit-quantity-dialog.component.html',
  styleUrl: './edit-quantity-dialog.component.scss',
})
export class EditQuantityDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditQuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      quantity: [data.quantity, [Validators.required, Validators.min(1)]],
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.quantity);
    }
  }
}
