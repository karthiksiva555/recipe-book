import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
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
  @ViewChild(PlaceholderDirective, {static: true}) placeholder: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router) { }

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
        this.isLoading = false;
        if(this.isLoginMode){
          this.router.navigate(['/recipes']);
        }
      },
      errorMessage => {
        this.error = errorMessage;
        // to show error using Dynamic Component 
        this.showError(errorMessage);
        this.isLoading = false;
      }
    );
    this.authForm.reset();
  }

  onClose(){
    this.error = null;
  }

  // Create alert component dynamically whenever there is an error
  showError(message: string){
    const viewContainerRef = this.placeholder.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    const closeSub = componentRef.instance.close.subscribe(()=>{
      closeSub.unsubscribe();
      viewContainerRef.clear();
    })
  }

}
