import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Product} from '../price-list/database';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  input = 1;

  constructor(
    public bsModalRef: BsModalRef,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
  }

  increase() {
    if (this.input === this.product.quantity) {
      return;
    }
    this.input++;
  }

  decrease() {
    if (this.input === 1) {
      return;
    }
    this.input--;
  }

  checkQuantity() {
    if (this.input >= this.product.quantity) {
      this.input = this.product.quantity;
    }
    if (this.input < 1) {
      this.input = 1;
    }
  }

  addToCart(id: string) {
    this.cartService.addToCart(id, this.input);
    this.bsModalRef.hide();
  }
}
