import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartItem } from '../cart-dropdown/cart-dropdown.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  user: any = null;

  cartItems: CartItem[] = [
    { name: 'Alma', quantity: 2, price: 250 },
    { name: 'Méz', quantity: 1, price: 1800 },
  ];

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
