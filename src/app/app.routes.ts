import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "info",
        loadComponent:() => import('./main/information-card-checkin/information-card-checkin.component').then((m) => m.InformationCardCheckInComponent)
    },
    {
        path: "",
        loadComponent:() => import('../app/auth/login/login.component').then((m) => m.LoginComponent)
    }
];
