import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { api } from '../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../layout/applayout/applayout.service';
import { HttpRequestService } from '../../services/http.service';
import { BaseComponent } from '../base-component/base-component.component';
import { ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem, BasePageListComponent } from '../base-page-list/base-page-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../debounce-event/debounce-event.directive';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'base-employee-control',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective,
  ],
  templateUrl: './base-employee-search.component.html',
  styleUrl: './base-employee-search.component.scss'
})
export class BaseEmployeeSearchComponent implements BaseComponent,OnChanges {
  @Input() getByIdOptions!: any;
  @Input() showFrom!: any;
  @Input() isModalMode: any= true;
  @Input() disableSelect: boolean= false;
  @Input() hiddenLeft: boolean= false;
  @Input() constValue!: any;
  //style margin
  @Input() top: number=-9.25;
  @Input() left: number=-100;
  @Output() selectedDataChange = new EventEmitter();
  @Output() selectedIdChange = new EventEmitter();
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.PER_EMPLOYEE_QUERY_LIST,
    deleteIds:api.PER_EMPLOYEE_DELETE_IDS
  };
  
  title: string[] = ['Danh sách nhân viên', 'List of employee'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  language!: boolean;
  showPopup!: boolean;
  selectedData!: any;
  showButtons: EnumBaseButton[] = [EnumBaseButton.CREATE, EnumBaseButton.DELETE, EnumBaseButton.EDIT, EnumBaseButton.APPROVE]
  columns: ICoreTableColumnItem[] = [
    {
      caption: ['id', 'id'],
      field: 'id',
      hidden: true,
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Trạng thái làm việc', 'Working Status'],
      field: 'statusName',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Mã NV', 'Employee Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Họ và tên', 'Employee name'],
      field: 'fullName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Địa chỉ', 'Address'],
      field: 'address',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Điện thoại', 'Phone'],
      field: 'phoneNumber',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Nhóm NV', 'Staff group'],
      field: 'staffGroupName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 150
    },
  ]
  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService,
    public appConfig: AppConfigService,
  ) {
    this.language = this.appConfig.LANGUAGE;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getByIdOptions']) {
      if(!!changes['getByIdOptions'].currentValue)
        this.getObjectById(changes['getByIdOptions'].currentValue);
    }
  }
  subscriptions: Subscription[]=[];
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription: Subscription) =>{
      subscription.unsubscribe();
    });
  }
  ngOnInit() {
    this.getListOtherListTypes()
    if (typeof window !== "undefined") {
      var win_h = window.outerHeight;
    }
    if(!!this.constValue){
      this.outerInOperators = [
        {
          field: 'staffGroupId',
          values: this.constValue
        }
      ]
    }
  }

  getListOtherListTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'STAFF_GROUP').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.otherListTypeOptions = data;
          }
        }
      })
    );
  }
  onSearchListType(e:any){
    console.log(this.searchType)
  }

  onSelectedListTypeChanged(e:any) {
    if(this.currentIdType == e.id) return;
    else{
      this.currentIdType = e.id;
      this.outerInOperators = [
        {
          field: 'staffGroupId',
          values: e.id
        }
      ]
    }
  }
  getObjectById(id: any) {
    this.httpService.makeGetRequest('getById', api.PER_EMPLOYEE_READ + id).subscribe((x) => {
      if (x.ok && x.status === 200) {
        const body = x.body;
        if (body.statusCode === 200) {
          const innerBody = body.innerBody;
          this.selectedData = innerBody;  
        }
      } else {
      }
      
    })
  }
  onShowPopup(){
    this.showPopup = true;
  }
  onClose(){
    this.showPopup = false;
  }
  onSelectedDataChange(e:any){
    this.selectedDataChange.emit(e);
    this.selectedIdChange.emit(e.id);
    this.selectedData = e
    this.showPopup = false;
  }
  onUnSelectedData(){
    this.selectedDataChange.emit(null);
    this.selectedIdChange.emit(null);
    this.selectedData = null;
  }
}
