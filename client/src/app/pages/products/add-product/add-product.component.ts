import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      isPreorder: [false],
      preorderDate: [null],
    });

    this.form.get('isPreorder')?.valueChanges.subscribe((isPreorder) => {
      const stockControl = this.form.get('stock');
      if (isPreorder) {
        stockControl?.setValue(0);
        stockControl?.disable();
      } else {
        stockControl?.enable();
      }
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;

    try {
      await this.productsService.createOne(this.form.value);
      this.router.navigate(['/management/products']);
    } catch (err: any) {
      this.error = err.message || 'Failed to create product';
    } finally {
      this.loading = false;
    }
  }
}
