import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/loading/loading.service';
import { setupAxiosInterceptors } from './core/axios.interceptor';

// TODO sidenav admin és farmer részére
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Farmers Market';

  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    setupAxiosInterceptors(this.loadingService);
    this.loading$ = this.loadingService.loading$;
  }
}
