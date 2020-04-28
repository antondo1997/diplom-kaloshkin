import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {PriceListComponent} from './price-list/price-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {OrdersComponent} from './orders/orders.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';


@NgModule({
  declarations: [DashboardLayoutComponent, PriceListComponent, ProductDetailComponent, OrdersComponent, ShoppingCartComponent, UserProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule
  ]
})
export class DashboardModule {
}
