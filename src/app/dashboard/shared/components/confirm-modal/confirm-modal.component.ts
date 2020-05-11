import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {OrderService} from '../../../services/order.service';
import {Subject} from 'rxjs';
import {CartService} from '../../../services/cart.service';
import {CartItem} from '../../../../shared/interfaces';
import {DatabaseService} from '../../../services/database.service';
import {switchMap} from 'rxjs/operators';

export type ConfirmType = 'order' | 'cart';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmModalComponent implements OnInit {

  public onClose: Subject<boolean> = new Subject<boolean>();
  type: ConfirmType;
  id: string;
  question: string;
  cartList: CartItem[];

  constructor(
    public bsModalRef: BsModalRef,
    private orderService: OrderService,
    private cartService: CartService,
    private dbService: DatabaseService
  ) {
  }

  ngOnInit(): void {
    // console.log(this.cartList);
    switch (this.type) {
      case 'order':
        this.question = 'Вы хотите удалить заказ?';
        break;
      case 'cart':
        this.question = 'Вы хотите удалить корзину?';
        break;
    }
  }

  onConfirm() {
    switch (this.type) {
      case 'order':
        this.dbService.delete(this.cartList)
          .pipe(
            switchMap(() => {
              return this.orderService.delete(this.id);
            })
          )
          .subscribe((res) => {
            this.onClose.next(true);
          });
        break;
      case 'cart':
        this.cartService.deleteCart().subscribe((res) => {
          this.onClose.next(true);
        });
        break;
    }
    this.bsModalRef.hide();
  }

  decline() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
