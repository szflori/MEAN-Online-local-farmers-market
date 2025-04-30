import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { User } from '../../interfaces/user.interface';
import { API_PATH } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends CrudService<User> {
  constructor() {
    super(API_PATH.users);
  }
}
