import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertService} from '../../../dashboard/services/alert.service';
import {Subscription} from 'rxjs';
import {AlertComponent} from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-alert-timeout',
  templateUrl: './alert-timeout.component.html',
  styleUrls: ['./alert-timeout.component.scss']
})
export class AlertTimeoutComponent implements OnInit, OnDestroy {

  alertSub: Subscription;
  public alerts: Alert[] = [];

  constructor(
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$
      .subscribe((alert) => {
        this.alerts.push(alert);
      });

  }

  add() {
    this.alerts.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  onClosed(dismissedAlert: Alert): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
