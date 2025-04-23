import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { FarmersComponent } from './farmers/farmers.component';
import { FarmerProductsComponent } from './farmers/farmer-products/farmer-products.component';
import { ProfileComponent } from './profile/profile.component';
import { FarmerRegisterComponent } from './auth/farmer-register/farmer-register.component';
import { AdminFarmerLayoutComponent } from './layouts/admin-farmer-layout/admin-farmer-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { RoleGuard } from './guards/role.guard';
import { CheckoutComponent } from './checkout/checkout.component';

// TODO Users table
const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'farmer-register', component: FarmerRegisterComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'farmers', component: FarmersComponent },
      { path: 'farmers/:id', component: FarmerProductsComponent },
    ],
  },

  {
    path: 'app',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },

  {
    path: 'management',
    component: AdminFarmerLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
