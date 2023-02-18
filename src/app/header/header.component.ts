import { Component, OnInit, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../logging.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  //providers:[LoggingService] // this gets a new instance of logging service for header component itself
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  userSubscription: Subscription;
  isUserAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService, 
    private authService: AuthService, 
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.userSubscription = this.authService.user.subscribe(user => {
    //   this.isUserAuthenticated = !!user; // true if user is not null, false otherwise
    // });
    this.userSubscription = this.store.select('auth')
      .pipe(map(authState => authState.user)) // store.select returns state, so get user from it 
      .subscribe(user => {
        this.isUserAuthenticated = !!user; // true if user is not null, false otherwise
      });
    this.loggingService.printLog("In ngOnInit of Header Component");
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData(){
    this.dataStorageService.saveRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe(recipes=> 
      console.log(recipes)
      );
  }

  onLogout(){
    this.authService.logout();
  }
}
