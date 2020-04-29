import {Component, OnInit} from '@angular/core';
import {DATABASE, Product} from './DATABASE';
import {FormControl, Validators} from '@angular/forms';
import {CartService} from '../services/cart.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProductDetailComponent} from '../product-detail/product-detail.component';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  bsModelRef: BsModalRef;
  database: Product[];
  inputs: number[];

  constructor(
    private cartService: CartService,
    private  modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.database = DATABASE;
    this.inputs = Array<number>(DATABASE.length).fill(1);
  }

  addToCart(id: string, idx: number) {
    console.log(`Product ${id} to cart - `, this.inputs[idx]);
    this.cartService.addToCart(id, this.inputs[idx]);
  }

  increase(idx: number) {
    if (this.inputs[idx] === this.database[idx].quantity) {
      return;
    }
    this.inputs[idx]++;
  }

  decrease(idx: number) {
    if (this.inputs[idx] === 1) {
      return;
    }
    this.inputs[idx]--;
  }

  openProductDetail(id: string) {
    const initialState = {product: this.database[id]};
    this.bsModelRef = this.modalService.show(ProductDetailComponent, Object.assign({initialState}, {class: 'modal-lg'}));
    this.bsModelRef.content.closeBtnName = 'Close';
  }
}
