import {Component, OnDestroy, OnInit} from '@angular/core';
import {DATABASE, Product} from './database';
import {CartService} from '../services/cart.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {DatabaseService} from '../services/database.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit, OnDestroy {

  bsModelRef: BsModalRef;
  database: Product[];
  inputs: number[];
  dbSub: Subscription;

  constructor(
    private cartService: CartService,
    private  modalService: BsModalService,
    private dbService: DatabaseService
  ) {
  }

  ngOnInit(): void {
    this.database = DATABASE;
    this.dbSub = this.dbService.getDB()
      .subscribe((db) => {
        // console.log(db);
        db.forEach((value, idx) => {
          this.database[idx].quantity = value.quantity;
        });
      });
    this.inputs = Array<number>(DATABASE.length).fill(1);
  }

  addToCart(id: string, idx: number) {
    console.log(`Product ${id} to cart - `, this.inputs[idx]);
    // console.log({haha: +this.inputs[idx]});
    this.cartService.addToCart(id, +this.inputs[idx]);
  }

  increase(idx: number) {
    if (this.inputs[idx] >= this.database[idx].quantity) {
      return;
    }
    this.inputs[idx]++;
  }

  decrease(idx: number) {
    if (this.inputs[idx] <= 1) {
      return;
    }
    this.inputs[idx]--;
  }

  checkQuantity(idx: number) {
    if (this.inputs[idx] >= this.database[idx].quantity) {
      this.inputs[idx] = this.database[idx].quantity;
    }
    if (this.inputs[idx] < 1) {
      this.inputs[idx] = 1;
    }
  }

  openProductDetail(id: string) {
    const initialState = {product: this.database[id]};
    this.bsModelRef = this.modalService.show(ProductDetailComponent, Object.assign({initialState}, {class: 'modal-lg'}));
  }

  ngOnDestroy() {
    if (this.dbSub) {
      this.dbSub.unsubscribe();
    }
  }
}
