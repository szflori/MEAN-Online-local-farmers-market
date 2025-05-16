import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  user: any = null;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });

    this.auth.checkSession();
  }
}
