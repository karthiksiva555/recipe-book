import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../auth-response-data';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error = null;
  authObservable: Observable<AuthResponseData>;

  @ViewChild('authForm') authForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
    const email = this.authForm.value["email"];
    const password = this.authForm.value["password"];
    this.isLoading = true;
    if(this.isLoginMode){
      this.authObservable = this.authService.signIn(email, password);
    } else{
      this.authObservable = this.authService.signUp(email, password);
    }
    this.authObservable.subscribe(
      response=>{
        console.log(response);
        this.isLoading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    this.authForm.reset();
  }

}
