import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Product } from '../../../../interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-farmer-show',
  standalone: false,
  templateUrl: './farmer-show.component.html',
  styleUrl: './farmer-show.component.scss',
})
export class FarmerShowComponent implements OnInit {
  user: (User & { id: string }) | null = null;
  products: Product[] = [];

  form!: FormGroup;
  loading = true;
  error: string | null = null;
  editMode = false;

  authU: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private productsService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((u) => {
      this.authU = u;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.load(id);
  }

  async load(id: string) {
    try {
      this.user = await this.usersService.getOne(id);
      this.products = await this.productsService.getList({ farmerId: id });
    } catch (err: any) {
      this.error = err.message || 'Failed to load user';
    } finally {
      this.loading = false;
    }
  }

  isUser() {
    return this.authU?.role === 'USER';
  }

  get isAuthed(): boolean {
    return !!this.authU;
  }

  editUser() {
    this.router.navigate(['/management/farmers', this.user?.id, 'edit']);
  }

  async deleteUser() {
    if (!this.user) return;

    const confirmed = confirm(
      `Biztosan törölni szeretnéd ${this.user.name} felhasználót?`
    );
    if (!confirmed) return;

    try {
      await this.usersService.deleteOne(this.user.id);
      this.router.navigate(['/management/farmers']);
    } catch (err: any) {
      alert(err.message || 'A törlés nem sikerült');
    }
  }
}
