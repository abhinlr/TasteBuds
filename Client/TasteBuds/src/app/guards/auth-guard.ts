import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import { ɵɵinject } from '@angular/core';

export const AuthGuard: CanActivateFn=(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = ɵɵinject(AuthService);
  const router = ɵɵinject(Router);
  const isAuth = authService.getAuthStatus();
  if(!isAuth){
    router.navigate(['/']);
  }
  return isAuth;
}

