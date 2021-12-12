import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkLoggedIn(route.path);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  private checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
