import {Component, OnDestroy, OnInit} from '@angular/core';
import {DATABASE, Product} from '../price-list/DATABASE';
import {CartService} from '../services/cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  // list: { id: string, amount: number }[];
  inputs: number[] = [];
  cartSum = 0;
  cartSub: Subscription;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    // this.list = this.cartService.getCartList();
    // console.log(this.list);
    this.cartSub = this.cartService.getCartList()
      .subscribe((cartItems) => {
        if (cartItems) {
          cartItems.forEach((item) => {
            this.products.push(DATABASE[item.id]);
            this.inputs.push(item.amount);
            this.cartSummary();
          });
        }

      });

    // this.inputs = Array<number>(this.cartService.getCartList().length).fill(1);
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
    this.inputs.forEach((value, i) => {
      this.cartSum += value * this.products[i].price;
    });
  }

  checkout() {
    console.log('Checkout', this.products);
  }

  ngOnDestroy(): void {
    if (this.cartSub){
      this.cartSub.unsubscribe();
    }
  }
}
