import { Injectable } from '@angular/core';
import { baseUrl,language } from '../app.config';
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  /* This BASE_URL will be red from assets/app-config/app.config.json */
  BASE_URL: string = baseUrl;
  LANGUAGE: boolean = language; // default language false => vn - true => en
  /********************************************************************/


  constructor() {}
}
