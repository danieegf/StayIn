import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from './navBarService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,public nav: NavbarService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const x=localStorage.getItem('auth');
    if (x==='true'){
      this.nav.show()
      return true
    }
    else{
      this.router.navigateByUrl('/login');
      this.nav.hide()
      return false;
    }
    return false;
  }
  
}
