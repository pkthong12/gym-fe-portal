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
export class CardInfoService {
  data$ = new BehaviorSubject<IAuthData | null>(null);
  constructor(
      private httpService: HttpRequestService
  ) { }

  getData(code:any): void{
    this.httpService.makeGetRequest('getData',api.CARD_INFO_GET_DATA_PORTAL+code)
    .subscribe(res=>{
      this.data$.next(res.body.innerBody)
    })
  }
}
