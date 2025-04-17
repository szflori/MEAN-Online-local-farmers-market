import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCardActions,
  MatCardContent,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { CartDropdownComponent } from './cart/cart-dropdown/cart-dropdown.component';
import { ProductsComponent } from './products/products.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FarmersComponent } from './farmers/farmers.component';
import { FarmerProductsComponent } from './farmers/farmer-products/farmer-products.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SuccessDialogComponent } from './shared/success-dialog/success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { CartState } from '../store/cart.state';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CartComponent,
    HeaderComponent,
    HomeComponent,
    CartDropdownComponent,
    ProductsComponent,
    FarmersComponent,
    FarmerProductsComponent,
    ProfileComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    LoadingComponent,
    ProductCardComponent,
    CartItemComponent,
  ],
  imports: [
    NgxsModule.forRoot([CartState]),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AuthModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatFormField,
    MatFormFieldModule,
    MatDialogModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
