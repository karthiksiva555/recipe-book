import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData } from '../auth-response-data';
import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error = null;
  authObservable: Observable<AuthResponseData>;
  storeSub: Subscription;

  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceholderDirective, {static: true}) placeholder: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((state) => {
      this.isLoading = state.loading;
      this.error = state.authError;
      if(this.error){
        this.showError(this.error);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
    const email = this.authForm.value["email"];
    const password = this.authForm.value["password"];
    //this.isLoading = true;
    if(this.isLoginMode){
      // this.authObservable = this.authService.signIn(email, password);
      this.store.dispatch(new AuthActions.LoginStart({userName: email, password: password}));
    } else{
      //this.authObservable = this.authService.signUp(email, password);
      this.store.dispatch(new AuthActions.SignupStart({userName: email, password: password}));
    }
    // this.authObservable.subscribe(
    //   response=>{
    //     this.isLoading = false;
    //     if(this.isLoginMode){
    //       this.router.navigate(['/recipes']);
    //     }
    //   },
    //   errorMessage => {
    //     this.error = errorMessage;
    //     // to show error using Dynamic Component 
    //     this.showError(errorMessage);
    //     this.isLoading = false;
    //   }
    // );
    this.authForm.reset();
  }

  onClose(){
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
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
