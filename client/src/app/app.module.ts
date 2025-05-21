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
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthModule } from './auth/auth.module';
import { CartDropdownComponent } from './pages/cart/cart-dropdown/cart-dropdown.component';
import { ProductsComponent } from './pages/products/products/products.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
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
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { AdminFarmerLayoutComponent } from './layouts/admin-farmer-layout/admin-farmer-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PublicHeaderComponent } from './layouts/public-layout/public-header/public-header.component';
import { UserHeaderComponent } from './layouts/user-layout/user-header/user-header.component';
import { AdminFarmerHeaderComponent } from './layouts/admin-farmer-layout/admin-farmer-header/admin-farmer-header.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { UsersComponent } from './pages/users-mgmt/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserComponent } from './pages/users-mgmt/user/user.component';
import { UserEditComponent } from './pages/users-mgmt/user-edit/user-edit.component';
import { ProductsMgmtComponent } from './pages/products/products-mgmt/products-mgmt.component';
import { ProductShowComponent } from './pages/products/product-show/product-show.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { OrdersMgmtComponent } from './pages/orders/orders-mgmt/orders-mgmt.component';
import { OrdersComponent } from './pages/orders/orders/orders.component';
import { OrderShowComponent } from './pages/orders/order-show/order-show.component';
import { OrderEditComponent } from './pages/orders/order-edit/order-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FarmersMgmtComponent } from './pages/farmers/farmers-mgmt/farmers-mgmt.component';
import { FarmerShowComponent } from './pages/farmers/farmer-show/farmer-show.component';
import { FarmerEditComponent } from './pages/farmers/farmer-edit/farmer-edit.component';
import { EditQuantityDialogComponent } from './pages/orders/order-edit/edit-quantity-dialog/edit-quantity-dialog.component';
import { AddProductDialogComponent } from './pages/orders/order-edit/add-product-dialog/add-product-dialog.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FarmersComponent } from './pages/farmers/farmers/farmers.component';
import { ProductCardComponent } from './pages/products/product-card/product-card.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    CartDropdownComponent,
    ProductsComponent,
    FarmersComponent,
    ProfileComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    LoadingComponent,
    ProductCardComponent,
    CartItemComponent,
    AdminFarmerLayoutComponent,
    UserLayoutComponent,
    PublicLayoutComponent,
    PublicHeaderComponent,
    UserHeaderComponent,
    AdminFarmerHeaderComponent,
    CheckoutComponent,
    UsersComponent,
    UserComponent,
    UserEditComponent,
    ProductsMgmtComponent,
    ProductShowComponent,
    ProductEditComponent,
    OrdersMgmtComponent,
    OrdersComponent,
    OrderShowComponent,
    OrderEditComponent,
    DashboardComponent,
    FarmersMgmtComponent,
    FarmerShowComponent,
    FarmerEditComponent,
    EditQuantityDialogComponent,
    AddProductDialogComponent,
    AddProductComponent,
    SalesReportComponent,
  ],
  imports: [
    NgxsModule.forRoot([CartState]),
    NgxsStoragePluginModule.forRoot({
      keys: ['cart'],
      storage: 1,
    }),
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
    MatFormFieldModule,
    MatDialogModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTableModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
