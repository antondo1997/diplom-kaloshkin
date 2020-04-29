import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth/auth.interceptor';
import {CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import { Page404Component } from './shared/components/page404/page404.component';
import {SharedModule} from './shared/shared.module';

// const INTERCEPTOR_PROVIDER: Provider = {
//   provide: HTTP_INTERCEPTORS,
//   multi: true,
//   useClass: AuthInterceptor
// };

@NgModule({
  declarations: [
    AppComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
