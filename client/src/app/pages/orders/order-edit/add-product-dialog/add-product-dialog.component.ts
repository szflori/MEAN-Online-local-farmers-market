import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../../services/products.service';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../../interfaces/order.interface';

@Component({
  selector: 'app-add-product-dialog',
  standalone: false,
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss',
})
export class AddProductDialogComponent implements OnInit {
  form: FormGroup;
  products: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { farmerId: string; order: Order },
    private fb: FormBuilder,
    private productsService: ProductsService,
    private orderService: OrderService
  ) {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  async ngOnInit() {
    try {
      this.data.farmerId;
      console.log(this.data.farmerId);
      const res = await this.productsService.getList({
        farmerId: this.data.farmerId,
      });
      this.products = res;
    } catch (err) {
      console.error('Nem sikerült lekérni a termékeket', err);
    }
  }

  save() {
    if (this.form.valid) {
      const selectedProduct = this.products.find(
        (p) => p._id === this.form.value.productId
      );
      const result = {
        productId: selectedProduct._id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price,
        quantity: this.form.value.quantity,
        ...selectedProduct,
      };

      const exists = this.data.order.items.find(
        (i) => i.productId === result.productId
      );
      if (exists) {
        exists.quantity += result.quantity;
      } else {
        this.data.order.items.push(result);
      }

      this.orderService.updateOne(this.data.order.id, this.data.order);

      this.dialogRef.close();
    }
  }
}
