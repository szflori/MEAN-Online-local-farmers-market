import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;
  filteredProducts: Product[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  sortOption = 'name';

  categories = ['all', 'Gyümölcs', 'Méz', 'Lekvár'];

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    try {
      this.products = await this.productsService.getList();
    } catch (err: any) {
      this.error = err.message || 'Could not load products';
    } finally {
      this.loading = false;
    }

    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products
      .filter(
        (p) =>
          (this.selectedCategory === 'all' ||
            p.category === this.selectedCategory) &&
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (this.sortOption) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.price - b.price;
          case 'stock':
            return b.stock - a.stock;
          default:
            return 0;
        }
      });
  }
}
