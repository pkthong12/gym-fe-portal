// GLOBAL IMPORT
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpRequestService } from "./http.service";
import { api } from "../constants/api/apiDefinitions";
import { IClientLoginRequest } from "../interfaces/IClientLoginRequest";
import { IAuthData } from "../interfaces/IAuthData";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data$ = new BehaviorSubject<IAuthData | null>(null);
  constructor(
      private httpService: HttpRequestService
  ) { }

  // Web client login
  userLogin(request: IClientLoginRequest): Observable<any> {
      return this.httpService.makePostRequest('clientLogin',api.SYS_LOGIN, request)
  }

  

  isAuthenticate = (): boolean => {
    return !!this.data$.value;
  };

  getUserInfo = () => {};

  getToken = (): string => {
    return this.data$.value!.token;
  };
  
}
