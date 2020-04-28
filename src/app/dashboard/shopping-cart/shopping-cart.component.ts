import {Component, OnInit} from '@angular/core';
import {DATABASE, Product} from '../price-list/DATABASE';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  database: Product[];
  inputs: number[];
  cartSum = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.database = DATABASE;
    this.inputs = Array<number>(DATABASE.length).fill(1);
    this.cartSummary();
  }

  increase(idx: number) {
    if (this.inputs[idx] === this.database[idx].quantity) {
      return;
    }
    this.inputs[idx]++;
    this.cartSummary();
  }

  decrease(idx: number) {
    if (this.inputs[idx] === 1) {
      return;
    }
    this.inputs[idx]--;
    this.cartSummary();
  }

  deleteItem(idx: number) {
    this.database.splice(idx, 1);
    this.inputs.splice(idx, 1);
  }

  cartSummary() {
    this.cartSum = 0;
    this.inputs.forEach((value, i) => {
      this.cartSum += value * this.database[i].price;
    });
    // for (const i in this.inputs){
    //   this.cartSum += this.inputs[i] * this.database[i].price;
    // }
  }
}
