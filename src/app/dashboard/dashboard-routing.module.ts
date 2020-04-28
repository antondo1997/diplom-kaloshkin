import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {PriceListComponent} from './price-list/price-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {OrdersComponent} from './orders/orders.component';
import {UserProfileComponent} from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '', component: DashboardLayoutComponent, children: [
      {path: '', pathMatch: 'full', component: PriceListComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'user-profile', component: UserProfileComponent},
      {path: 'orders', component: OrdersComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
