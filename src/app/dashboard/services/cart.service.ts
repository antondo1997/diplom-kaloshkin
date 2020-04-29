import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CartItem} from '../../shared/interfaces';
import {first, map} from 'rxjs/operators';

@Injectable()
export class CartService {

  cartList: CartItem[] = [];

  public cartBadge$: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient
  ) {
  }

  addToCart(id: string, newAmount: number) {
    // console.log({id, newAmount});
    // console.log('list length:', this.cartList.length);
    // console.log('filter:', this.cartList.filter((product) => product.id === id)[0]);
    if (this.cartList.filter((product) => product.id === id).length && this.cartList.length) {
      const index = this.cartList.indexOf(this.cartList.filter((product) => product.id === id)[0]);
      this.cartList[index] = {id: this.cartList[index].id, amount: this.cartList[index].amount + newAmount};
    } else {
      this.cartList.push({id, amount: newAmount});
    }
    this.http.patch(`${environment.databaseURL}/cart.json`, {...this.cartList})
      .subscribe((response) => {
        console.log(response);
      });
    this.cartBadge$.next(this.totalAmount());
    console.log('Cart List:', this.cartList);
  }

  getCartList() {
    return this.http.get<CartItem[]>(`${environment.databaseURL}/cart.json`);
  }

  getCart() {
    this.http.get<CartItem[]>(`${environment.databaseURL}/cart.json`)
      .subscribe((cartList) => {
        // console.log(cartList);
        if (cartList) {
          this.cartList = cartList;
          this.cartBadge$.next(this.totalAmount());
        }
      });
  }

  totalAmount() {
    if (!this.cartList.length) {
      return 0;
    }
    return this.cartList
      .map((item) => item.amount)
      .reduce((preVal, curVal) => preVal + curVal);
  }

  changeAmount(id: string, amount: number) {
    const index = this.cartList.indexOf(this.cartList.filter((product) => product.id === id)[0]);
    this.cartList[index] = {id: this.cartList[index].id, amount};
    this.http.patch(`${environment.databaseURL}/cart.json`, {...this.cartList})
      .subscribe((response) => {
        // console.log(response);
      });
    this.cartBadge$.next(this.totalAmount());
  }

  deleteItem(id: string, idx: number) {
    this.cartList = this.cartList.filter((item) => item.id !== id);
    console.log(this.cartList);
    this.http.delete(`${environment.databaseURL}/cart/${idx}.json`)
      .subscribe((response) => {
        console.log('Res Delete:', response);
        this.cartBadge$.next(this.totalAmount());
      });
  }

}
