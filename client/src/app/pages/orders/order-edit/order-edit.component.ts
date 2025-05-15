import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../../interfaces/order.interface';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditQuantityDialogComponent } from './edit-quantity-dialog/edit-quantity-dialog.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-order-edit',
  standalone: false,
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.scss',
})
export class OrderEditComponent implements OnInit {
  form!: FormGroup;
  order!: Order;
  user: any;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.user = this.authService.currentUser;
    try {
      this.order = await this.orderService.getOne<Order>(id);
      this.form = this.fb.group({
        status: [this.order.status, Validators.required],
        address: [this.order.address, Validators.required],
        phone: [this.order.phone, Validators.required],
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  canEdit(field: string): boolean {
    if (this.user.role === 'ADMIN') return true;
    if (this.user.role === 'FARMER')
      return field === 'status' || field === 'items';
    if (this.user.role === 'USER')
      return field === 'address' || field === 'phone';
    return false;
  }

  async onSubmit() {
    const payload: any = {};

    if (this.canEdit('status')) payload.status = this.form.value.status;
    if (this.canEdit('address')) payload.address = this.form.value.address;
    if (this.canEdit('phone')) payload.phone = this.form.value.phone;

    try {
      await this.orderService.updateOne(this.order.id, payload);
      this.router.navigate(['/management/orders', this.order.id]);
    } catch (err: any) {
      alert(err.message || 'Sikertelen mentés');
    }
  }

  openQuantityDialog(item: any) {
    const dialogRef = this.dialog.open(EditQuantityDialogComponent, {
      data: { name: item.name, quantity: item.quantity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        item.quantity = result;
      }
    });
  }

  removeItem(id: string) {
    this.order.items = this.order.items.filter((item) => item.productId != id);
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: { farmerId: this.order.farmer.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const exists = this.order.items.find(
          (i) => i.productId === result.productId
        );
        if (exists) {
          exists.quantity += result.quantity;
        } else {
          this.order.items.push(result);
        }
      }
    });
  }
}
