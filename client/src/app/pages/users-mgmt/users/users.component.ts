import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user.interface';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role'];

  loading = true;
  error: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.usersService.getList();
    } catch (err: any) {
      this.error = err.message || 'Failed to load users';
    } finally {
      this.loading = false;
    }
  }
}
