import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger' | 'info';

export interface Alert {
  type: AlertType;
  msg: string;
  timeout: number;
}

@Injectable()
export class AlertService {

  public alert$ = new Subject<Alert>();

  constructor() {
  }

  success(msg: string, timeout: number) {
    // console.log(msg);
    this.alert$.next({type: 'success', msg, timeout});
  }

}
