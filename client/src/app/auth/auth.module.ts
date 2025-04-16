import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FarmerRegisterComponent } from './farmer-register/farmer-register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, FarmerRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatError,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
})
export class AuthModule {}
