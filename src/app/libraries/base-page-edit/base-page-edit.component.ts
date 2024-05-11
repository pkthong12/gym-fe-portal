import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { BaseEditComponent } from '../base-edit/base-edit.component';
import { ICorePageListApiDefinition } from '../base-page-list/base-page-list.component';
import { CommonModule } from '@angular/common';
import { BasePageListService } from '../base-page-list/base-page-list.service';
import { HttpRequestService } from '../../services/http.service';
import { api } from '../../constants/api/apiDefinitions';
import { PreLoaderComponent } from '../../layout/pre-loader/pre-loader.component';
import { AppConfigService } from '../../services/app-config.service';
import { AlertService } from '../alert/alert.service';
import { Subscription } from 'rxjs';
import { PreLoaderFullScreenComponent } from '../../layout/pre-loader-full-screen/pre-loader-full-screen.component';

export interface ICorePageEditCRUD {
  c?: api; // Create
  r?: api; // GetById
  u?: api; // Update
  d?: api; // Delete

}
@Component({
  selector: 'app-base-page-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PreLoaderComponent,
    PreLoaderFullScreenComponent
  ],
  templateUrl: './base-page-edit.component.html',
  styleUrl: './base-page-edit.component.scss'
})
export class BasePageEditComponent extends BaseEditComponent implements OnInit,AfterViewInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() width!: number;
  @Input() main!: TemplateRef<any>;
  @Input() title!: string[];
  
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() crud!: ICorePageEditCRUD;
  @Input() isModalMode!: boolean;
  @Input() isAlertnoti!: boolean;

  @Output() onInitialValueStringReady = new EventEmitter<string>();

  @ViewChild('container') container!: ElementRef;
  @ViewChild('containerBigger') containerBigger!: ElementRef;

  id!: number;
  isDevMode!: boolean;
  subscriptions: Subscription[] =[];
  loading: boolean = false;
  payLoad = '';

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    private router: Router,
    private route: ActivatedRoute,
    public appConfig: AppConfigService,
    private alertService: AlertService
  ) {
    super(dialogService);
    this.language = this.appConfig.LANGUAGE;
    this.isDevMode = isDevMode();
    this.id = Number(atob(this.route.snapshot.params['id']));

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription: Subscription) =>subscription.unsubscribe());
  }
  ngAfterViewInit(): void {
    if (!!!this.isModalMode) {
      // this.container.nativeElement.style.setProperty('--width', '100%');
    } else {
      if (!!this.width) {
       setTimeout(() => {
        this.containerBigger.nativeElement.style.setProperty(
          'max-width',
          this.width + 'px'
        );
       },200)
      }
      this.containerBigger.nativeElement.style.setProperty(
        '--height',
        '95%'
      )
    }

    setTimeout(() => {
      this.onInitialValueStringReady.emit(
        JSON.stringify(this.form.getRawValue())
      );
    })
    
  }
  ngOnInit(): void {
    this.form = this.formGroup;
    if (!!this.id && this.id != 0) {
      this.getObjectById(this.id)
    }
    if(window.location.href.indexOf(`sys-user`)! > 0 ){
      if(Number(atob(this.route.snapshot.params['id'])) == 0){
      }else{
      this.getObjectById(atob(this.route.snapshot.params['id']))
      }
    }
  }
  getObjectById(id: any) {
    this.loading = true;
    this.httpService.makeGetRequest('getById', this.crud.r! + id).subscribe((x) => {
      if (x.ok && x.status === 200) {
        const body = x.body;
        if (body.statusCode === 200) {
          const innerBody = body.innerBody;
          this.form.patchValue(innerBody);
          this.loading = false;
          this.onInitialValueStringReady.emit(
            JSON.stringify(this.form.getRawValue())
          );
        }
        else{
          this.alertService.error(body.messageCode);
          this.loading = false;
        }
      } else {
        this.onNotOk200Response(x);
      }
      
    })
  }
  getRawValue() {
    this.payLoad = JSON.stringify(this.form.getRawValue(), null, 2);
  }
  saveData() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.payLoad = JSON.stringify(this.form.getRawValue())
    if (!!!this.form.get('id')!.value) {
      this.httpService.makePostRequest('create', this.crud.c!, this.payLoad).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body = x.body;

          if(this.isAlertnoti == true) {
            if(body.statusCode == 200){
              this.alertService.success(body.messageCode);
            }
            else if(body.statusCode == 400){
              this.alertService.info(body.messageCode);
            }
            else{
              this.alertService.error(body.messageCode);
            }
          }

          if (body.statusCode === 200) {
            if (isDevMode()) {
            }
            this.onInitialValueStringReady.emit(
              JSON.stringify(this.form.getRawValue())
            );
            this.loading = false;
            this.ignoreDeactivate = true;

            this.alertService.success('Thêm mới thành công');
            this.router.navigate(['../'], { relativeTo: this.route, state: { id: body.innerBody.id } });
          }
        } 
        else {
          this.loading = false;
          this.alertService.error(x.message);
          this.onNotOk200Response(x);
        }
        this.loading = false;
      })

    } else {
      this.httpService.makePostRequest('update', this.crud.u!, this.payLoad).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body = x.body;

          if(this.isAlertnoti == true) {
            if(body.statusCode == 200){
              this.alertService.success(body.messageCode);
            }
            else if(body.statusCode == 400){
              this.alertService.info(body.messageCode);
            }
            else{
              this.alertService.error(body.messageCode);
            }
          }

          if (body.statusCode === 200) {
            if (isDevMode()) {
            }

            this.onInitialValueStringReady.emit(
              JSON.stringify(this.form.getRawValue())
            );
            this.loading = false;
            this.ignoreDeactivate = true;
            this.alertService.success('Cập nhật thành công');
            this.router.navigate(['../'], { relativeTo: this.route, state: { id: body.innerBody.id } });
          }
        } 
        else {
          this.onNotOk200Response(x);
        }
        this.loading = false;
      })
    }
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onNotOk200Response(x: object): void {
    if (isDevMode()) {
      if (Object.keys(x).length === 0) {
        //this.alertService.error("No response content. It was possibly a CORS error.", noneAutoClosedAlertOptions)
        console.log(x)
      } else {
        //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions)
      }
    }
  }
}