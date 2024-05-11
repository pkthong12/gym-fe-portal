import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { errorMessage } from '../../constants/error-control'

@Component({
  selector: 'app-base-edit',
  standalone: true,
  imports: [],
  templateUrl: './base-edit.component.html',
  styleUrl: './base-edit.component.scss'
})
export class BaseEditComponent {
  ErrorMessage = errorMessage;
  language!: boolean;
  formInitStringValue!: string;
  form!: FormGroup;
  entityTable!: string;
  showModal: boolean = false;
  ignoreDeactivate: boolean = false;
  constructor(
    public dialogService: DialogService
  ) { 
  }

  canDeactivate(): Observable<boolean> | boolean {
    const condition = JSON.stringify(this.form.getRawValue()) === this.formInitStringValue;
    if (condition || this.ignoreDeactivate === true) {
      return true;
    } else {
      console.log("show-dialog");
      this.dialogService.busy = true;
      this.dialogService.showConfirmDialog$.next(true);
      this.dialogService.title$.next("XÁC NHẬN");
      this.dialogService.body$.next("Dữ liệu đã được thay đổi và sẽ không được lưu nếu điều hướng!");
      this.dialogService.okButtonText$.next("Đồng ý");
      this.dialogService.cancelButtonText$.next("Quay lại");
      const observable = this.dialogService.canDeactivate$.asObservable();
      return observable;
    }   
  }

}
