import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-header',
  standalone: false,
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent implements OnInit {
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
