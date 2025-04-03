import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { CartDropdownComponent } from './cart-dropdown/cart-dropdown.component';
import { ProductsComponent } from './products/products.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FarmersComponent } from './farmers/farmers.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
