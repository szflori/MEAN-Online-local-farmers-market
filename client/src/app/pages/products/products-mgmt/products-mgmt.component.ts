import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-products-mgmt',
  standalone: false,
  templateUrl: './products-mgmt.component.html',
  styleUrl: './products-mgmt.component.scss',
})
export class ProductsMgmtComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'farmer', 'category', 'stock', 'price'];

  loading = true;
  error: string | null = null;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productsService.getList();
    try {
    } catch (err: any) {
      this.error = err.message || 'Failed to load products';
    } finally {
      this.loading = false;
    }
  }
}
