import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  form!: FormGroup;
  productId!: string;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
  }

  async loadProduct() {
    try {
      const product = await this.productsService.getOne(this.productId);
      this.form = this.fb.group({
        name: [product.name, Validators.required],
        category: [product.category, Validators.required],
        description: [product.description || ''],
        price: [product.price, Validators.required],
        stock: [product.stock, Validators.required],
        imageUrl: [product.imageUrl || ''],
      });
    } catch (err: any) {
      this.error = err.message || 'Failed to load product';
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await this.productsService.updateOne(this.productId, this.form.value);
      this.router.navigate(['/management/products', this.productId]);
    } catch (err: any) {
      this.error = err.message || 'Failed to update product';
    }
  }
}
