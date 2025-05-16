import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products/products.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { FarmerRegisterComponent } from './auth/farmer-register/farmer-register.component';
import { AdminFarmerLayoutComponent } from './layouts/admin-farmer-layout/admin-farmer-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { UsersComponent } from './pages/users-mgmt/users/users.component';
import { UserComponent } from './pages/users-mgmt/user/user.component';
import { UserEditComponent } from './pages/users-mgmt/user-edit/user-edit.component';
import { ProductShowComponent } from './pages/products/product-show/product-show.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { OrdersMgmtComponent } from './pages/orders/orders-mgmt/orders-mgmt.component';
import { ProductsMgmtComponent } from './pages/products/products-mgmt/products-mgmt.component';
import { OrderShowComponent } from './pages/orders/order-show/order-show.component';
import { OrderEditComponent } from './pages/orders/order-edit/order-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FarmersMgmtComponent } from './pages/farmers/farmers-mgmt/farmers-mgmt.component';
import { FarmerShowComponent } from './pages/farmers/farmer-show/farmer-show.component';
import { FarmerEditComponent } from './pages/farmers/farmer-edit/farmer-edit.component';
import { OrdersComponent } from './pages/orders/orders/orders.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { FarmersComponent } from './pages/farmers/farmers/farmers.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'farmer-register', component: FarmerRegisterComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'farmers', component: FarmersComponent },
      { path: 'farmers/:id', component: FarmerShowComponent },
    ],
  },

  {
    path: 'app',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'farmers', component: FarmersComponent },
      { path: 'farmers/:id', component: FarmerShowComponent },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderShowComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },

  {
    path: 'management',
    component: AdminFarmerLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserComponent },
      { path: 'users/:id/edit', component: UserEditComponent },
      { path: 'products', component: ProductsMgmtComponent },
      { path: 'products/new', component: AddProductComponent },
      { path: 'products/:id', component: ProductShowComponent },
      { path: 'products/:id/edit', component: ProductEditComponent },
      { path: 'orders', component: OrdersMgmtComponent },
      { path: 'orders/:id', component: OrderShowComponent },
      { path: 'orders/:id/edit', component: OrderEditComponent },
      { path: 'farmers', component: FarmersMgmtComponent },
      { path: 'farmers/:id', component: FarmerShowComponent },
      { path: 'farmers/:id/edit', component: FarmerEditComponent },
      { path: 'sales-report', component: SalesReportComponent },
      /* { path: 'programs' }, */ //TODO csa programs crud
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
