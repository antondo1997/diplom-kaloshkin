import {NgModule, Provider} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {TextMaskModule} from 'angular2-text-mask';
import {ModalModule} from 'ngx-bootstrap/modal';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {PriceListComponent} from './price-list/price-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {OrdersComponent} from './orders/orders.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CartService} from './services/cart.service';
import {AuthGuard} from '../shared/auth/auth.guard';
import {ProfileService} from './services/profile.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth/auth.interceptor';
import {AlertService} from './services/alert.service';
import {OrderService} from './services/order.service';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';

registerLocaleData(ruLocale, 'ru');

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
    UserProfileComponent,
    OrderDetailComponent
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    TextMaskModule,
    ModalModule.forChild()
  ],
  exports: [],
  providers: [
    CartService, AuthGuard, ProfileService, INTERCEPTOR_PROVIDER, AlertService, OrderService
  ]
})
export class DashboardModule {
}
