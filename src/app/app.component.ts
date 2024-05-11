import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './libraries/alert/alert.component';
import { AppConfigService } from './services/app-config.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { TokenService } from './services/token.service';
import { PreLoaderComponent } from './layout/pre-loader/pre-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ApplayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertComponent,
    PreLoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit, OnDestroy, AfterViewInit,OnChanges{
  title = 'GymAngularFrontend';
  authenticated!: boolean;
  subscriptions: Subscription[] = [];
  expiration: any;
  isExpiration!: boolean;
  loading!: boolean
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.authenticated = !!x)
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.subscriptions.map(x => {
    //   if (x) x.unsubscribe()
    // })
  }

  ngAfterViewInit(): void {
    
  }
}