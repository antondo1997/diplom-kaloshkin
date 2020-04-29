import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CartService} from '../services/cart.service';
import {AuthService} from '../../shared/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  // cartBadgeSub: Subscription;

  constructor(
    public cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartService.getCart();
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    // if (this.cartBadgeSub){
    //   this.cartBadgeSub.unsubscribe();
    // }
  }

}
