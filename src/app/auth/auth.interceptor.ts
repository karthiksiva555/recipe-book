import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // get user
    // return this.authService.user.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if(!user){
          return next.handle(request);
        }
        const modifiedReq = request.clone({params: request.params.append('auth', user.token)});
        return next.handle(modifiedReq);
      })
    );
  }
}
