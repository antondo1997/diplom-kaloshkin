import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {Subscription} from 'rxjs';
import {Order} from '../../shared/interfaces';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {OrderDetailComponent} from './order-detail/order-detail.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  bsModelRef: BsModalRef;
  orderSub: Subscription;
  orders: Order[];
  isLoading: boolean;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.orderSub = this.orderService.getOrders()
      .subscribe((orders) => {
        // console.log(orders);
        this.orders = orders;
        this.isLoading = false;
      }, (error) => {
        console.log(error);
        this.isLoading = false;
      });
  }

  openOrderDetail(id: string) {
    // const initialState = {product: this.database[id]};
    // this.orderService.getById(id).subscribe((order) => {
    //   console.log(order);
    // });
    const selectedOrder: Order = this.orders.filter((order) => order.id === id)[0];
    const initialState = {order: selectedOrder};
    this.bsModelRef = this.modalService.show(OrderDetailComponent, Object.assign({initialState}, {class: 'modal-xl'}));

  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

}
