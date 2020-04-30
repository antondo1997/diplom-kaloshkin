import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AlertTimeoutComponent } from './components/alert-timeout/alert-timeout.component';
import {AlertModule} from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [AlertTimeoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertTimeoutComponent,
    AlertModule
  ]
})
export class SharedModule {
}
