import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CartItem, Order} from '../../shared/interfaces';
import {first, map, tap} from 'rxjs/operators';
import {AlertService} from './alert.service';
import {DATABASE} from '../price-list/database';

@Injectable()
export class CartService {

  cartList: CartItem[] = [];

  public cartBadge$: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient,
    private alertService: AlertService
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
        // console.log(response);
        this.cartBadge$.next(this.totalAmount());
        this.alertService.success(`Товар ${DATABASE[+id].name} довален в корзину`);
      });
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
    // console.log(this.cartList);
    this.http.delete(`${environment.databaseURL}/cart/${idx}.json`)
      .subscribe((response) => {
        // console.log('Item:', response);
        this.cartList = this.cartList.filter((item) => item.id !== id);
        this.cartBadge$.next(this.totalAmount());
      });
  }

  checkout(cartSum: number) {
    const order: Order = {
      cartList: this.cartList,
      cartSum,
      totalAmount: this.totalAmount(),
      date: new Date()
    };
    return this.http.post(`${environment.databaseURL}/orders.json`, order);
  }

  deleteCart() { // delete cart after checkout
    return this.http.delete(`${environment.databaseURL}/cart.json`)
      .pipe(
        tap(() => {
          this.cartList.splice(0, this.cartList.length);
          this.cartBadge$.next(this.totalAmount());
        })
      );
  }

}
