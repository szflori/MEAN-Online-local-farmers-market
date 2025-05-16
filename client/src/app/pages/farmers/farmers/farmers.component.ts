import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../../services/farmer.service';

interface Farmer {
  id: string;
  name: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;
}

//TODO farmers card add favorite
// TODO programok és termékek
@Component({
  selector: 'app-farmers',
  standalone: false,
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.scss',
})
export class FarmersComponent implements OnInit {
  farmers: Farmer[] = [];
  loading = true;
  error: string | null = null;

  constructor(private farmerService: FarmerService) {}

  async ngOnInit() {
    try {
      this.farmers = await this.farmerService.getFarmers();
    } catch (err: any) {
      this.error = err.message || 'Error loading farmers';
    } finally {
      this.loading = false;
    }
  }
}
