import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  form!: FormGroup;
  userId!: string;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  async loadUser() {
    try {
      const user = await this.usersService.getOne(this.userId);
      this.form = this.fb.group({
        name: [user.name, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        role: [user.role, Validators.required],
        address: [user.address || ''],
        avatarUrl: [user.avatarUrl || ''],
        bio: [user.bio || ''],
      });
    } catch (err: any) {
      this.error = err.message || 'Failed to load user';
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await this.usersService.updateOne(this.userId, this.form.value);
      this.router.navigate(['/management/users', this.userId]);
    } catch (err: any) {
      this.error = err.message || 'Failed to update user';
    }
  }
}
