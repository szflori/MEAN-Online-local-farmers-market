import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { FarmerService } from '../farmers/farmer.service';
import { Product } from '../../interfaces/product.interface';

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

  constructor(
    private farmerService: FarmerService,
    private productsService: ProductsService
  ) {}

  async ngOnInit() {
    try {
      this.farmers = await this.farmerService.getFarmers();
    } catch (err: any) {
      this.error = err.message || 'Error loading farmers';
    } finally {
      this.loading = false;
    }

    try {
      this.products = await this.productsService.getProducts();
    } catch (err: any) {
      this.error = err.message || 'Could not load products';
    } finally {
      this.loading = false;
    }
  }
}
