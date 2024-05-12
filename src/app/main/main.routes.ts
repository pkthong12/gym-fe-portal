import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "info",
        loadComponent:() => import('./information-card-checkin/information-card-checkin.component').then((m) => m.InformationCardCheckInComponent)
      },
];
