import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { DomService } from '../../services/dom.service';
import { AlertService } from './alert.service';
import { CommonModule } from '@angular/common';

export interface IAlert {
    id: string;
    type?: EnumAlertType;
    message?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    fade?: boolean;
    timeClose?: number;
}

export enum EnumAlertType {
    Success,
    Error,
    Info,
    Warning
}

export class IAlertOptions {
    id?: string;
    autoClose: boolean =true;
    keepAfterRouteChange?: boolean;
    timeClose?: number = 3000;
}
@Component({
    selector: 'core-alert',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    @ViewChild('container') container!: ElementRef;

    alerts: IAlert[] = [];

    subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private alertService: AlertService,
        private domService: DomService
    ) { }

    ngOnInit() {
        // subscribe to new alert notifications

        this.subscriptions.push(
            this.alertService.alerts$.subscribe(x => this.alerts = x)
        )

        // clear alerts on location change
        this.subscriptions.push(
            this.router.events.subscribe(event => {
                if (event instanceof NavigationStart) {
                    this.alertService.clear(this.id);
                }
            })
        );
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.container!.nativeElement.style.setProperty('--z-index', this.domService.getMaxZIndex() + 1)

            this.subscriptions.push(
                this.alertService.alerts$.pipe(
                    switchMap(x => this.alertService.alerts$)
                )
                    .subscribe(x => {
    
                        this.alerts = x;
                        this.container!.nativeElement.style.setProperty('--z-index', this.domService.getMaxZIndex() + 1)
    
                        // auto close alert if required
                        x.map(alert => {
                            if (!!alert.autoClose) {
                                setTimeout(() => this.removeAlert(alert), alert.timeClose);
                            }
                        })
                    })
            );
    
        })
    }

    removeAlert(alert: IAlert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        // fade out alert if this.fade === true
        const timeout = this.fade ? 250 : 0;
        alert.fade = this.fade;

        setTimeout(() => {
            // filter alert out of array
            const newAlerts = this.alerts.filter(x => x.id !== alert.id);
            this.alertService.alerts$.next(newAlerts);
        }, timeout);
    }

    cssClass(alert: IAlert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissible'];

        const alertTypeClass = {
            [EnumAlertType.Success]: 'alert-success',
            [EnumAlertType.Error]: 'alert-danger',
            [EnumAlertType.Info]: 'alert-info',
            [EnumAlertType.Warning]: 'alert-warning'
        }

        if (alert.type !== undefined) {
            classes.push(alertTypeClass[alert.type]);
        }

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.subscriptions.map(x => x.unsubscribe());
    }
}