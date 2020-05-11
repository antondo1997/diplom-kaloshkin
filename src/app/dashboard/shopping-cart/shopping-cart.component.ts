import {Component, OnDestroy, OnInit} from '@angular/core';
import {DATABASE, Product} from '../price-list/database';
import {CartService} from '../services/cart.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ConfirmModalComponent} from '../shared/components/confirm-modal/confirm-modal.component';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

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
    private modalService: BsModalService,
    private http: HttpClient
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

  checkQuantity(id: string, idx: number) {
    if (this.inputs[idx] >= this.products[idx].quantity) {
      this.inputs[idx] = this.products[idx].quantity;
    }
    if (this.inputs[idx] < 1) {
      this.inputs[idx] = 1;
    }
    this.cartService.changeAmount(id, this.inputs[idx]);
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
    // const database: { id: string, quantity: number }[] = [
    //   {id: '0', quantity: 0},
    //   {id: '1', quantity: 0},
    //   {id: '2', quantity: 0},
    //   {id: '3', quantity: 0},
    //   {id: '4', quantity: 0},
    //   {id: '5', quantity: 0},
    //   {id: '6', quantity: 0},
    //   {id: '7', quantity: 0},
    //   {id: '8', quantity: 0},
    //   {id: '9', quantity: 0}
    // ];
    // this.http.patch(`${environment.databaseURL}/database.json`, {...database})
    //   .subscribe((res) => {
    //     console.log(res);
    //   });

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
