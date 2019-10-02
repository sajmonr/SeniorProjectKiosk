import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SettingsService} from './shared/services/settings.service';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class CookieGuard implements CanActivate{

  constructor(private settings: SettingsService, private cookie: CookieService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.settings);

    if(this.settings.cookieRoom == 'cookieRoom'){
      return true;
    }else{
      return false;
    }
  }
}
