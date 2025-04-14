import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      const response = await this.auth.login(this.form.value);
      this.dialog
        .open(SuccessDialogComponent, {
          data: { message: response.message || 'Login successful' },
        })
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } catch (err: any) {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: err.message || 'Login failed' },
      });
    }
  }
}
