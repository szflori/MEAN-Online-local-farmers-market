import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { User } from '../../../interfaces/user.interface';
import { FarmerService } from '../../services/farmer.service';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';

interface Farmer {
  id: string;
  name: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  farmers: Farmer[] = [];
  loading = true;
  error: string | null = null;

  user: User | null = null;

  constructor(
    private farmerService: FarmerService,
    private productsService: ProductsService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((u) => {
      this.user = u;
    });
  }

  async ngOnInit() {
    try {
      this.farmers = await this.farmerService.getFarmers();
    } catch (err: any) {
      this.error = err.message || 'Error loading farmers';
    } finally {
      this.loading = false;
    }

    try {
      this.products = await this.productsService.getList();
    } catch (err: any) {
      this.error = err.message || 'Could not load products';
    } finally {
      this.loading = false;
    }
  }

  get isAuthed(): boolean {
    return !!this.user;
  }

  getLink(farmerId: string): string[] {
    return this.isAuthed ? ['/app/farmers', farmerId] : ['/farmers', farmerId];
  }
}
