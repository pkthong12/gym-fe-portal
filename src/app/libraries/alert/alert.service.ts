import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumAlertType, IAlert, IAlertOptions } from './alert.component';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    alerts$ = new BehaviorSubject<IAlert[]>([]);

    // convenience methods
    success(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Success, message, id } as IAlert);
    }

    error(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Error, message, id } as IAlert);
    }

    info(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Info, message, id } as IAlert);
    }

    warn(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Warning, message, id } as IAlert);
    }

    // main alert method    
    alert(alert: IAlert) {
        alert.id = alert.id;
        alert.autoClose = alert.autoClose ?? true;
        alert.timeClose = alert.timeClose ?? 3000;
        this.alerts$.next([...this.alerts$.value, alert])
    }

    // clear alerts
    clear(id: string) {
        this.alerts$.next(this.alerts$.value.filter(x => x.id !== id))
    }
}