import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { DialogService } from '../../services/dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent extends BaseComponent {
  @Input() showingUp!: boolean;
  @ViewChild('container') container!: ElementRef;

  show!: boolean | undefined;

  okButtonText: string = "Đồng ý"; // DEFAULT
  cancelButtonText: string = "Hủy"; 
  title!: string;
  body!: string;
  showCancelOnly!: boolean;
  informationLines!: string[];
  reason: string = '';


  constructor(
    private dialogService: DialogService,
  ) {
    super();

    this.subscriptions.push(
      this.dialogService.showConfirmDialog$.subscribe(x => {
        this.show = x
      })
    )
    this.subscriptions.push(
      this.dialogService.title$.subscribe(x => this.title = x)
    )
    this.subscriptions.push(
      this.dialogService.body$.subscribe(x => this.body = x)
    )
    this.subscriptions.push(
      this.dialogService.okButtonText$.subscribe(x => this.okButtonText = x)
    )
    this.subscriptions.push(
      this.dialogService.cancelButtonText$.subscribe(x => this.cancelButtonText = x)
    )
    this.subscriptions.push(
      this.dialogService.showCancelOnly$.subscribe(x => this.showCancelOnly = x)
    )
    this.subscriptions.push(
      this.dialogService.informationLines$.subscribe(x => this.informationLines = x)
    )
    this.subscriptions.push(
      dialogService.reason$.subscribe(x => this.reason = x)
    )
    this.subscriptions.push(
      dialogService.showingUp$.subscribe(x => this.showingUp = x)
    )
  }

  override ngAfterViewInit(): void {

  }

  close(): void {
    this.dialogService.showConfirmDialog$.next(false);

    // Clear the other states
    this.dialogService.resetService()
  }

  onConfirm(): void {
    this.dialogService.showConfirmDialog$.next(false);
    this.dialogService.canDeactivate$.next(true);
    this.dialogService.dialogConfirmed$.next({
      ...this.dialogService.dialogConfirmed$.value!,
      confirmed: true
    });
  }

  onReasonEvent(e: any){
    if(!!e){
      this.dialogService.reason$.next(this.reason)
    }
  }
  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
    this.dialogService.resetService();
    this.dialogService.reason$.next('')
  }
}
