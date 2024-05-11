import { Injectable } from "@angular/core";
import { HttpRequestService } from "../../services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BasePageListService {
    constructor(
        private httpService: HttpRequestService,
    ) { }

    queryList(url: string,request?: any): Observable<any> {
        return this.httpService.makePostRequest(
            'queryList',
            url,
            request
        );
    }

    deleteIds(url: string,request?: any): Observable<any> {
        return this.httpService.makePostRequest(
            'deleteIds',
            url,
            request
        );
    }
    unapproveIds(url: string,request?: any): Observable<any> {
        return this.httpService.makePostRequest(
            'unapproveIds',
            url,
            request
        );
    }
    exportExcel(url: string,request?: any): Observable<any> {
        return this.httpService.makeDownloadRequest(
            'excel',
            url,
            request
        );
    }
    exportPdf(url: string,request?: any): Observable<any> {
        return this.httpService.makeDownloadRequest(
            'pdf',
            url,
            request
        );
    }

}