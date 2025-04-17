import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: false,
  template: `
    <h2 mat-dialog-title>{{ data.message }}</h2>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Continue</button>
    </mat-dialog-actions>
  `,
})
export class SuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<SuccessDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
