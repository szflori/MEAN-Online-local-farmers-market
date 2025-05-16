import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  user: any = null;
  
  form!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private auth: AuthService,
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
      stock: [0, [Validators.min(0)]],
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

    this.auth.user$.subscribe((user) => {
      this.user = user;
    });

    this.auth.checkSession();
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;

    const payload = {}
    
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
