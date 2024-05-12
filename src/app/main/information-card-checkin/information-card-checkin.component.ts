import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CardInfoService } from '../../services/card-info.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { api } from '../../constants/api/apiDefinitions';
import { HttpRequestService } from '../../services/http.service';
import { AlertService } from '../../libraries/alert/alert.service';
import { AlertComponent } from '../../libraries/alert/alert.component';

@Component({
  selector: 'app-information-card-check-in',
  standalone: true,
  imports: [
    AlertComponent, 
  ],
  templateUrl: './information-card-check-in.component.html',
  styleUrl: './information-card-check-in.component.scss'
})
export class InformationCardCheckInComponent implements OnInit, AfterViewInit, OnDestroy{
  loading: boolean = true;
  subscriptions: Subscription[] =[];
  data!: any;
  constructor(
    private cardInfoService: CardInfoService,
    private httpService: HttpRequestService,
    private alertService: AlertService,
    private router: Router,
  ) { 
    this.cardInfoService.data$.subscribe(data => {
      this.data = data;
    });
  }
  ngAfterViewInit(): void {
    if(!!this.data){
      console.log('first')
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription: Subscription) =>{
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.loading = true;
    var card = this.data.cardCode;
    this.subscriptions.push(
      this.httpService.makePostRequest('checkIn',api.CARD_CHECK_IN_CHECK_IN,{
        cardCode:card
      }).subscribe(data => {
        if (!!data.ok && data.status === 200) {
          const body = data.body;
          if (body.statusCode === 200) {
            this.alertService.success(body.messageCode||'Check out Success');
            this.cardInfoService.getData(card);
            this.router.navigate(['../']);
          }else{
            this.alertService.warn(body.messageCode);
          }
          this.loading = false;
          
        } else {
          this.loading = false;
          this.alertService.error(data.message);
        }
      })
    );    
  }

}
