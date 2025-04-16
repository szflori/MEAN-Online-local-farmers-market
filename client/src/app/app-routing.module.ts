import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { FarmersComponent } from './farmers/farmers.component';
import { FarmerProductsComponent } from './farmers/farmer-products/farmer-products.component';
import { ProfileComponent } from './profile/profile.component';
import { FarmerRegisterComponent } from './auth/farmer-register/farmer-register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'farmer-register', component: FarmerRegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'farmers', component: FarmersComponent },
  { path: 'farmers/:id/products', component: FarmerProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
