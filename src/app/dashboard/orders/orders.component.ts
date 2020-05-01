import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {Subscription} from 'rxjs';
import {Order} from '../../shared/interfaces';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {ConfirmModalComponent} from '../shared/components/confirm-modal/confirm-modal.component';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  bsModalRef: BsModalRef;
  bsModalRefSub: Subscription;
  orderSub: Subscription;
  orders: Order[] = [];
  isLoading: boolean;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
    private alertService: AlertService
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
    this.bsModalRef = this.modalService.show(OrderDetailComponent, Object.assign({initialState}, {class: 'modal-xl'}));

  }

  confirmDeleteOrder(id: string) {
    const initialState = {type: 'order', id};
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {initialState});
    this.bsModalRefSub = this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.orders = this.orders.filter((order) => order.id !== id);
        this.alertService.success(`Заказ ${id} отменен`);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
    if (this.bsModalRefSub) {
      this.bsModalRefSub.unsubscribe();
    }
  }
}
