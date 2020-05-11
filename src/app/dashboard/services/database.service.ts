import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {CartItem} from '../../shared/interfaces';

@Injectable()
export class DatabaseService {

  constructor(
    private http: HttpClient
  ) {
  }

  getDB(): Observable<{ id: string, quantity: number }[]> {
    return this.http.get<{ id: string, quantity: number }[]>(`${environment.databaseURL}/database.json`);
  }

  add(cartList: CartItem[]) {
    return this.getDB()
      .pipe(
        switchMap((db) => {
          const newDb = db;
          cartList.forEach((valCartItem) => {
            newDb.forEach((valDb) => {
              if (valCartItem.id === valDb.id) {
                valDb.quantity -= valCartItem.amount;
              }
            });
          });
          console.log('newdb:', newDb);
          return this.http.patch(`${environment.databaseURL}/database.json`, {...newDb});
        })
      );
    // .subscribe();
  }

  delete(cartList: CartItem[]) {
    console.log(cartList);
    return this.getDB()
      .pipe(
        switchMap((db) => {
          const newDb = db;
          cartList.forEach((valCartItem) => {
            newDb.forEach((valDb) => {
              if (valCartItem.id === valDb.id) {
                valDb.quantity += valCartItem.amount;
              }
            });
          });
          console.log('newdb:', newDb);
          return this.http.patch(`${environment.databaseURL}/database.json`, {...newDb});
        })
      );
  }

}
