import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Order} from '../../shared/interfaces';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient
  ) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.databaseURL}/orders.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response)
            .map((key) => ({
              ...response[key],
              id: key
            }));
        })
      );
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${environment.databaseURL}/orders/${id}.json`);
  }
}
