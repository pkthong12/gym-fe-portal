import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

export interface ICanComponentDeactivate {
  canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {
  canDeactivate(
    component: ICanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
