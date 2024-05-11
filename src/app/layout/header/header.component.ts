import { Component } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../../libraries/tooltip/tooltip.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    TooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  language: boolean = true;
  data!:any;
  employeeId:any ='/home';
  subscriptions: Subscription[] = [];
  constructor(
    public appConfig: AppConfigService,
    private tọkenServices: TokenService,
    private authService: AuthService,
    private router: Router,
  ){
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.data = x)
    )
    if(!!this.data.employeeId){
      this.employeeId ='/cms/profile/employees/'+ btoa(this.data.employeeId)
    }
  }
  onChangeLanguage(){
    this.appConfig.LANGUAGE = !this.appConfig.LANGUAGE;
  }
  logOut(){
    this.tọkenServices.userLogout();
    this.router.navigate(['/']);
  }
  showProfile(){
    this.router.navigate(['/cms/profile/employees/'+btoa(this.data.employeeId)]);
  }
}
