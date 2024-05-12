import { AfterViewInit, Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import { AppConfigService } from '../../services/app-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../libraries/alert/alert.service';
import { IClientLoginRequest } from '../../interfaces/IClientLoginRequest';
import { IAuthData } from '../../interfaces/IAuthData';
import { IFormatedResponse } from '../../interfaces/IFormatedResponse';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../libraries/alert/alert.component';
import { PreLoaderComponent } from '../../layout/pre-loader/pre-loader.component';
import { HttpRequestService } from '../../services/http.service';
import { api } from '../../constants/api/apiDefinitions';
import { CardInfoService } from '../../services/card-info.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,   
    AlertComponent, 
    PreLoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  form: FormGroup;
  passwordInputType: string = 'password';
  subscriptions: Subscription[] = [];
  showPassword: boolean = false;
  model: LoginInterface = new LoginInterface();
  
  constructor(
    private fb: FormBuilder,
    public appConfigService: AppConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private httpService: HttpRequestService,
    private cardInfoService: CardInfoService,
  ) {

    this.form = this.fb.group({
      cardCode: [null,[Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    var card = this.form.get('cardCode')?.value;
    this.subscriptions.push(
      this.httpService.makePostRequest('checIn',api.CARD_CHECK_IN_CHECK_IN,{
        cardCode:card
      }).subscribe(data => {
        if (!!data.ok && data.status === 200) {
          const body = data.body;
          if (body.statusCode === 200) {
            this.alertService.success(body.messageCode||'Check In Success');
            this.router.navigate(['/info']);
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }

  ngOnDestroy(): void {
  }

}
