import {Component, OnDestroy, OnInit} from '@angular/core';
import {DATABASE, Product} from '../price-list/database';
import {CartService} from '../services/cart.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ConfirmModalComponent} from '../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  bsModalRef: BsModalRef;
  bsModalRefSub: Subscription;
  products: Product[] = [];
  inputs: number[] = [];
  cartSum = 0;
  cartSub: Subscription;

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private router: Router,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.cartSub = this.cartService.getCartList()
      .subscribe((cartItems) => {
        if (cartItems) {
          cartItems.forEach((item, i) => {
            this.products.push(DATABASE[item.id]);
            this.inputs.push(item.amount);
            this.cartSum += item.amount * this.products[i].price;
          });
        }

      });
  }

  increase(id: string, idx: number) {
    if (this.inputs[idx] === this.products[idx].quantity) {
      return;
    }
    this.inputs[idx]++;
    this.cartService.changeAmount(id, this.inputs[idx]);
    this.cartSummary();
  }

  decrease(id: string, idx: number) {
    if (this.inputs[idx] === 1) {
      return;
    }
    this.inputs[idx]--;
    this.cartService.changeAmount(id, this.inputs[idx]);
    this.cartSummary();
  }

  deleteItem(id: string, idx: number) {
    this.cartService.deleteItem(id, idx);
    this.products.splice(idx, 1);
    this.inputs.splice(idx, 1);
    this.cartSummary();
  }

  cartSummary() {
    this.cartSum = 0;
    this.inputs.forEach((amount, i) => {
      this.cartSum += amount * this.products[i].price;
    });
  }

  checkout() {
    console.log('Checkout', this.products);
    this.cartService.checkout(this.cartSum)
      .subscribe((data) => {
        this.cartService.deleteCart().subscribe(() => {
          this.products.splice(0, this.products.length);
        });
        this.alertService.success('Заказ успешно оформлен', 3500);
        this.router.navigate(['/dashboard/orders']);
      });
  }

  confirmDeleteCart() {
    const initialState = {type: 'cart'};
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {initialState});
    this.bsModalRefSub = this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.products.splice(0, this.products.length);
        this.alertService.success('Корзина удалена');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
    if (this.bsModalRefSub) {
      this.bsModalRefSub.unsubscribe();
    }
  }
}
