import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthResponseData } from './auth-response-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=<get a token from firebase>', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      })
    );
  }
  
  signIn(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=<get a token from firebase>', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      })
    );
  }

  // moved to a separate method for re-usability; currently used in signup and signin
  private handleError(errorResponse: HttpErrorResponse){
    let error = 'An unknown error occurred!';
    if(errorResponse.error && errorResponse.error.error && errorResponse.error.error.message){
      switch(errorResponse.error.error.message){
        case 'EMAIL_EXISTS': 
                error = "An account already exists with this email address";
                break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD': 
                error = "The credentials entered are invalid";
                break;
      }
    }
    return throwError(error);
  }

  // Creates a new user from the response of the API call and notifies subscribers of the new user
  private handleAuthentication(email: string, id: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
  }
}
