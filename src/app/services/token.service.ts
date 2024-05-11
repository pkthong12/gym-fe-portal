import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpRequestService } from './http.service';
import { api } from '../constants/api/apiDefinitions';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isExpired$ = new BehaviorSubject<boolean>(true);
  constructor(private httpService: HttpRequestService,
    private authService: AuthService,) {}

  // Lưu token vào localStorage với thời gian hết hạn
  saveToken(token: string, expiresIn: Date): void {
    localStorage.setItem('gym_token', token);

    // Tự động xóa token khi nó hết hạn
    setTimeout(() => {
      this.removeToken();
    }, (expiresIn.getTime() - new Date().getTime())*1000);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('gym_token');
  }

  // Xóa token khỏi localStorage
  removeToken(): void {
    localStorage.removeItem('gym_token');
    this.isExpired$.next(true);
  }

  getExpiration(): number {
    if(!this.getToken()) {
      this.isExpired$.next(true);
      return 0;
    }
    this.httpService.makePostRequest('Refresh',api.SYS_REFRESH,{token: this.getToken()}).subscribe(x=>{
      if(!!x.ok && x.status =='200'){
        const body = x.body;
        if(body.statusCode == 200){
          const data = body.innerBody;
          if(!!data.isExpired){
            this.removeToken();
            return 0;
          }
          else{
            this.saveToken(data.token, new Date(data.dateExpire));
            this.authService.data$.next(data);
            return data.expiresIn;
          }
        }
      }
    });
    return 0;
  }
  // Web client logout
  userLogout(): Observable<any> {
    const url = api.SYS_LOGOUT
    this.authService.data$.next(null);
    this.removeToken()
    return this.httpService.makePostRequest("clientLogout", url, {})
  }
}
