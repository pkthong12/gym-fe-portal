import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, of } from 'rxjs';

export interface IDialogConfirmModel {
  instanceNumber: number;
  confirmed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  busy!: boolean;

  showConfirmDialog$ = new BehaviorSubject<boolean | undefined>(undefined);
  canDeactivate$ = new Subject<boolean>;
  dialogConfirmed$ = new BehaviorSubject<IDialogConfirmModel | undefined>(undefined);

  title$ = new BehaviorSubject<string>("");
  body$ = new BehaviorSubject<string>("");
  okButtonText$ = new BehaviorSubject<string>("");
  cancelButtonText$ = new BehaviorSubject<string>("");
  showCancelOnly$ = new BehaviorSubject<boolean>(false);
  informationLines$ = new BehaviorSubject<string[]>([]);
  reason$ = new BehaviorSubject<string>('');
  showingUp$ = new BehaviorSubject<boolean>(false)

  dialogStateOpen$ = new BehaviorSubject<boolean | undefined>(undefined);

  constructor() {
    this.dialogConfirmed$.pipe(
      filter(x => !!x?.confirmed)
    ).subscribe(_ =>this.resetService())
  }

  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns observable resolving to `true`=confirm or `false`=cancel
   */
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');
    return of(confirmation);
  }

  resetService(): void {
    this.busy = false;
    this.dialogConfirmed$.next(undefined)
    this.title$.next("")
    this.body$.next("")
    this.okButtonText$.next("")
    this.cancelButtonText$.next("")
    this.showCancelOnly$.next(false)
    this.informationLines$.next([])
    this.showingUp$.next(false)
  }

  alert(message: string): void {
    window.alert(message);
  }

  createNew(
    title: "Dialog", 
    okButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
    showCancelOnly: boolean = false,
    body: "",
    informationLines: any[] = [],
    ): void {
      this.title$.next(title);
      this.okButtonText$.next(okButtonText);
      this.cancelButtonText$.next(cancelButtonText);
      this.showCancelOnly$.next(showCancelOnly);
      this.body$.next(body);
      this.informationLines$.next(informationLines);
      this.busy = true;
      this.showConfirmDialog$.next(true);
  }

}