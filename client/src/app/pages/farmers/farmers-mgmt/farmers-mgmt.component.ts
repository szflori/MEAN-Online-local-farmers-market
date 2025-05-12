import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user.interface';
import { FarmerService } from '../../../services/farmer.service';

@Component({
  selector: 'app-farmers-mgmt',
  standalone: false,
  templateUrl: './farmers-mgmt.component.html',
  styleUrl: './farmers-mgmt.component.scss',
})
export class FarmersMgmtComponent implements OnInit {
  farmers: User[] = [];
  displayedColumns: string[] = ['name', 'email'];

  loading = true;
  error: string | null = null;

  constructor(private farmersService: FarmerService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.farmers = await this.farmersService.getFarmers();
    } catch (err: any) {
      this.error = err.message || 'Failed to load farmers';
    } finally {
      this.loading = false;
    }
  }
}
