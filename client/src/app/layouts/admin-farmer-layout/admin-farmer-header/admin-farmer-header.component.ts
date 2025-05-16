import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

//TODO logo navigation
@Component({
  selector: 'app-admin-farmer-header',
  standalone: false,
  templateUrl: './admin-farmer-header.component.html',
  styleUrl: './admin-farmer-header.component.scss',
})
export class AdminFarmerHeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  user: any = null;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });

    this.auth.checkSession();
  }

  logout() {
    this.auth.logout().then(() => window.location.reload());
  }
}
