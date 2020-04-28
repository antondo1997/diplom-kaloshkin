import {Component, OnInit} from '@angular/core';
import {DATABASE, Product} from './DATABASE';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  database: Product[];
  inputs: number[];

  constructor() {
  }

  ngOnInit(): void {
    this.database = DATABASE;
    this.inputs = Array<number>(DATABASE.length).fill(1);
  }

  addToCart(id: string, idx: number) {
    console.log(`Product ${id} to cart - `, this.inputs[idx]);
  }

  increase(idx: number) {
    if (this.inputs[idx] === this.database[idx].quantity){
      return;
    }
    this.inputs[idx]++;
  }

  decrease(idx: number) {
    if (this.inputs[idx] === 1){
      return;
    }
    this.inputs[idx]--;
  }
}
