import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-farmer-show',
  standalone: false,
  templateUrl: './farmer-show.component.html',
  styleUrl: './farmer-show.component.scss',
})
export class FarmerShowComponent implements OnInit {
  user: (User & { id: string }) | null = null;
  form!: FormGroup;
  loading = true;
  error: string | null = null;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadUser(id);
  }

  async loadUser(id: string) {
    try {
      this.user = await this.usersService.getOne(id);
    } catch (err: any) {
      this.error = err.message || 'Failed to load user';
    } finally {
      this.loading = false;
    }
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
