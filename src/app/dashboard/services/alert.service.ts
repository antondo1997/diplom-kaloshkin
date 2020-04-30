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
  defaultTimeout = 3000;

  constructor() {
  }

  success(msg: string, timeout = this.defaultTimeout) {
    this.alert$.next({type: 'success', msg, timeout});
  }

  info(msg: string, timeout = this.defaultTimeout) {
    this.alert$.next({type: 'info', msg, timeout});
  }

  warning(msg: string, timeout = this.defaultTimeout) {
    this.alert$.next({type: 'warning', msg, timeout});
  }

  danger(msg: string, timeout = this.defaultTimeout) {
    this.alert$.next({type: 'danger', msg, timeout});
  }

}
