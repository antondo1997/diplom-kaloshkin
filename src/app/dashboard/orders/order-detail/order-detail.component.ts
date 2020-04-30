import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from '../../../shared/interfaces';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {OrderService} from '../../services/order.service';
import {Database, Product} from '../../price-list/database';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  products: Product[] = [];
  cartSum = 0;

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit(): void {
    // console.log(this.order);
    this.order.cartList.forEach((cartItem, i) => {
      this.products.push(Database[cartItem.id]);
      // this.cartSum += cartItem.amount * this.products[i].price;
    });
  }

}
