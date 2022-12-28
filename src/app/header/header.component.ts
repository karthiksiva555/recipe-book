import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  userSubscription: Subscription;
  isUserAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isUserAuthenticated = !!user; // true if user is not null, false otherwise
    })
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
}
