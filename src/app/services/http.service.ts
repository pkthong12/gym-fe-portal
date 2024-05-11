import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, last, map } from "rxjs";
import { AppConfigService } from "./app-config.service";

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  /*
    Access-Control-Allow-Credentials allows the request to access cookies (including HttpOnly)
    to be improved: set it only when refreshing token
  */
  'Access-Control-Allow-Credentials': 'true'
})

const cacheHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'cacheRequest': 'true',
})


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient,
    public appConfigService: AppConfigService) {
  }

  makePostRequest(name: string, relativeApiEndPoint: string, payload: any): Observable<any> {
    const token = localStorage.getItem('gym_token');
    const header1s = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(this.appConfigService.BASE_URL + relativeApiEndPoint, payload, {
      headers: header1s, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        last(),
        // catchError(this.handleError(name))
      )
  }

  makeGetRequest(name: string, relativeApiEndPoint: string, cacheRequest: boolean = false): Observable<any> {
    const token = localStorage.getItem('gym_token');
    const header1s = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(this.appConfigService.BASE_URL + relativeApiEndPoint, {
      headers: cacheRequest ? cacheHeaders : header1s, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        map(response => response),
        last(), // :void return last (completed) message to caller
        // catchError(this.handleError(name))
      )
  }
  makeDownloadRequest(name: string, relativeApiEndPoint: string, payload: any): Observable<any> {
    const token = localStorage.getItem('gym_token');
    const header1s = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(this.appConfigService.BASE_URL + relativeApiEndPoint, payload, {
      headers: header1s, observe: 'response', reportProgress: true, withCredentials: true,responseType: 'blob'
    })
  }
}