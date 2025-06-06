import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Product } from '../../interfaces/product.interface';
import { API_PATH } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends CrudService<Product> {
  constructor() {
    super(API_PATH.products);
  }
}
