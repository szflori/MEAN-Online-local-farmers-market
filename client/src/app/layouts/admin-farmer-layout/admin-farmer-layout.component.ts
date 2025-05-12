import { Component } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-farmer-layout',
  standalone: false,
  templateUrl: './admin-farmer-layout.component.html',
  styleUrl: './admin-farmer-layout.component.scss',
})
export class AdminFarmerLayoutComponent {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((u) => {
      this.user = u;
    });
  }

  get isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }
}
