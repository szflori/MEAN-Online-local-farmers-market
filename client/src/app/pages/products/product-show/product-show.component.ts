import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../interfaces/product.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-show',
  standalone: false,
  templateUrl: './product-show.component.html',
  styleUrl: './product-show.component.scss',
})
export class ProductShowComponent implements OnInit {
  product: (Product & { id: string }) | null = null;
  form!: FormGroup;
  loading = true;
  error: string | null = null;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadProduct(id);
  }

  async loadProduct(id: string) {
    try {
      this.product = await this.productsService.getOne(id);
    } catch (err: any) {
      this.error = err.message || 'Failed to load product';
    } finally {
      this.loading = false;
    }
  }

  editProduct() {
    this.router.navigate(['/management/products', this.product?.id, 'edit']);
  }

  async deleteProduct() {
    if (!this.product) return;

    const confirmed = confirm(
      `Biztosan törölni szeretnéd ${this.product.name} terméket?`
    );
    if (!confirmed) return;

    try {
      await this.productsService.deleteOne(this.product.id);
      this.router.navigate(['/management/products']);
    } catch (err: any) {
      alert(err.message || 'A törlés nem sikerült');
    }
  }
}
