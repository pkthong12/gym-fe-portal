import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { api } from '../../constants/api/apiDefinitions';
import { BaseComponent } from '../base-component/base-component.component';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { AppConfigService } from '../../services/app-config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-checklist',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './base-checklist.component.html',
  styleUrl: './base-checklist.component.scss'
})
export class CheckListComponent implements BaseComponent, OnChanges {
  @Input() apiGetOptions!: string;
  @Input() getByIdOptionCheckLists!: any[];
  @Output() valueChange = new EventEmitter;

  subscriptions: Subscription[] = [];
  data: any[] = [];
  dataShow: any[] = [];
  language!: boolean;
  showOptions: boolean = false;
  holderText: string = '';
  /**
   *
   */
  selected: boolean = false;
  selectedId!: any;
  selectedIds: number[] = [];
  checkingModel: boolean[] = [];
  constructor(
    private httpService: HttpRequestService,
    public appConfig: AppConfigService,
  ) {
    this.language = this.appConfig.LANGUAGE;

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getByIdOptionCheckLists']) {
      if(!!changes['getByIdOptionCheckLists'].currentValue && !changes['getByIdOptionCheckLists'].firstChange){
        this.selectedIds = changes['getByIdOptionCheckLists'].currentValue;
        this.checkValueSelected(this.selectedIds);
      }
    }
  }

  checkValueSelected(e:any[]){
    const newHolder: string[] = [];
    this.data.map((x) => {
      if (e.includes(x.id)) {
        newHolder.push(x.name);
      }
    })
    this.holderText = e.length == this.data.length ? 'Tất cả' : newHolder.join('; ')
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!!this.apiGetOptions && this.apiGetOptions !== '') {
        this.subscriptions.push(
          this.httpService.makeGetRequest('get', this.apiGetOptions).pipe().subscribe((x) => {
            if (!!x.ok && x.status == '200') {
              const body = x.body;
              if (body.statusCode == '200') {
                const data = body.innerBody;
                this.data = data;
                this.dataShow = data;
              }
            }
          })
        )
      }
    })
    // this.dataShow.map((_: any, index) => {
    //   this.checkingModel[index] = true;
    // })
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription) => subscription.unsubscribe())
  }
  onSelectedIds(e: any) {
    this.checkingModel[e] = !this.checkingModel[e];
    this.onCheckingNgModelChange();
  }
  onCheckingNgModelChange() {
    const newSelectedIds: number[] = [];
    const newSelectedData: any[] = [];
    const newHolder: string[] = [];
    this.data.filter((_: any, index: number) => !!this.checkingModel[index]).map(item => {
      newSelectedIds.push(item.id)
      newHolder.push(item.name)
      newSelectedData.push(item)
    })
    this.holderText = newSelectedIds.length == this.data.length ? 'Tất cả' : newHolder.join('; ')
    this.selectedIds = newSelectedIds;
    this.valueChange.emit(this.selectedIds);
  }
  onShowOptions() {
    this.showOptions = !this.showOptions;
  }
  onBlur() {
    this.showOptions = false;
    this.valueChange.emit(this.selectedIds)
  }
  onUnselectedIds() {
    this.selectedIds = [];
    this.holderText = '';
    this.checkingModel.map((_: any, index) => {
      this.checkingModel[index] = false;
    })
    this.valueChange.emit(this.selectedId)
  }
}
