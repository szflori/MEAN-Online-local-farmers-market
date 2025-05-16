import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../../services/farmer.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../../interfaces/user.interface';

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

  user: User | null = null;

  constructor(
    private farmerService: FarmerService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((u) => {
      this.user = u;
    });
  }

  async ngOnInit() {
    try {
      this.farmers = await this.farmerService.getFarmers();
    } catch (err: any) {
      this.error = err.message || 'Error loading farmers';
    } finally {
      this.loading = false;
    }
  }

  get isAuthed(): boolean {
    return !!this.user;
  }

  getLink(farmerId: string): string[] {
    return this.isAuthed ? ['/app/farmers', farmerId] : ['/farmers', farmerId];
  }
}
