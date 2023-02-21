import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../auth-response-data";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

    // called when authentication is successful via SignIn and SignUp
    handleAuthentication = (email: string, id: string, token: string, expiresIn: number) => {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.LoginSuccess({
            email: email,
            id: id,
            token: token,
            expirationDate: expirationDate
        })
    };

    // handles error during authentication process for SignIn and Signup
    handleError = (errorResponse) => {
        let error = 'An unknown error occurred!';
        if (errorResponse.error && errorResponse.error.error && errorResponse.error.error.message) {
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    error = "An account already exists with this email address";
                    break;
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_PASSWORD':
                    error = "The credentials entered are invalid";
                    break;
            }
        }
        return of(new AuthActions.LoginFail(error))
    }

    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData:AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
                    {
                        email: authData.payload.userName,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }).pipe(
                        map((result: AuthResponseData) => {
                            return this.handleAuthentication(result.email, result.localId, result.idToken, +result.expiresIn);
                        }),
                        catchError(errorResponse => {
                            return this.handleError(errorResponse);
                        })
                    );
            })
        )
    });
    
    //When authentication is successful, redirect the user to a protected page
    authRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN_SUCCESS, AuthActions.LOGOUT),
            tap(() => {
                this.router.navigate(['/']);
            })
        )
    }, {dispatch: false});

    // Old way of creating an effect with dispatch false
    // @Effect({dispatch: false})
    // authSuccess$ = this.actions$.pipe(
    //     ofType(AuthActions.LOGIN_SUCCESS),
    //     tap(() => {
    //         this.router.navigate(['/']);
    //     })
    // );

    authSignup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((signupAction: AuthActions.SignupStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
                    {
                        email: signupAction.payload.userName,
                        password: signupAction.payload.password,
                        returnSecureToken: true
                    }).pipe(
                        map((result) => {
                            return this.handleAuthentication(result.email, result.localId, result.idToken, +result.expiresIn);
                        }),
                        catchError(errorResponse => {
                            return this.handleError(errorResponse);
                        })
                    )
            }))
    });

    // create the user in localStorage item when user logs out
    authLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                localStorage.removeItem('userData');
            })
        )
    }, {dispatch: false});

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(() => {
                const userData: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpirationDate: string;
                  } = JSON.parse(localStorage.getItem('userData'));
                  if(!userData){
                    return { type: 'Dummy'};
                  }
                  const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
                  if(loadedUser.token){
                    return new AuthActions.LoginSuccess({
                      email: loadedUser.email, id: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)
                    });
                  }
                  return { type: 'Dummy'}; 
            })
        )
    });
}