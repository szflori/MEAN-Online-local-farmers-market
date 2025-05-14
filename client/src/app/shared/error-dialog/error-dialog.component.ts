import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  standalone: false,
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
