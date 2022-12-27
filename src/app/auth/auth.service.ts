import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthResponseData } from './auth-response-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwRsvfV8Jmoday_-BfCzR_GWGTu8Ftw4E', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  signIn(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwRsvfV8Jmoday_-BfCzR_GWGTu8Ftw4E', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError)
    );
  }

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
}
