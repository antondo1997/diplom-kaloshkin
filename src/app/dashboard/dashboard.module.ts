import {NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {ModalModule} from 'ngx-bootstrap/modal';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {PriceListComponent} from './price-list/price-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {OrdersComponent} from './orders/orders.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CartService} from './services/cart.service';
import {AuthGuard} from '../shared/auth/auth.guard';
import {SharedModule} from '../shared/shared.module';
import {ProfileService} from './services/profile.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth/auth.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    PriceListComponent,
    ProductDetailComponent,
    OrdersComponent,
    ShoppingCartComponent,
    UserProfileComponent
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    TextMaskModule,
    ModalModule.forRoot()
  ],
  exports: [],
  providers: [
    CartService, AuthGuard, ProfileService, INTERCEPTOR_PROVIDER
  ]
})
export class DashboardModule {
}
