import { Injectable } from '@angular/core';
import { API_PATH } from '../../services/api';
import { CrudService } from '../shared/crud.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends CrudService<any> {
  constructor() {
    super(API_PATH.orders);
  }
}
