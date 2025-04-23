import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-farmer-register',
  standalone: false,
  templateUrl: './farmer-register.component.html',
  styleUrl: './farmer-register.component.scss',
})
export class FarmerRegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      const response = await this.auth.registerFarmer(this.form.value);
      this.dialog
        .open(SuccessDialogComponent, {
          data: { message: response.message || 'You can now log in.' },
        })
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    } catch (err: any) {
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message: err.message || 'Something went wrong during registration.',
        },
      });
    }
  }
}
