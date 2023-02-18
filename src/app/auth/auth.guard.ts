import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.user.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user), // get user from appState
      map(user => {
        const isAuth = !!user;
        if(isAuth){
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      // ,tap(isAuth=>{ //this one works as well without createUrlTree but can lead to some issues with race conditions
      //   if(!isAuth){
      //     this.router.navigate(['/auth']);
      //   }
      // })
      );       
  }
  
}
