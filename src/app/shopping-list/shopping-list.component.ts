import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { StartEdit } from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'; // this is a convention suggested by NgRx

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // private iaSubscription: Subscription;
  // ingredients: Ingredient[] = [];
  ingredients: Observable<{ ingredients: Ingredient[]}>;

  // {shoppingList: {ingredients: []}} => type {key : value} where value is list of ingredients; later changed to interface type
  constructor(public store: Store<fromApp.AppState>) { }
  
  ngOnDestroy(): void {
    // this.iaSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // select is NgRx method that gets data as an observable 
    this.ingredients = this.store.select('shoppingList'); // gets all ingredients from store
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.iaSubscription = this.shoppingListService.ingredientsChanged.subscribe(ingredients => {
    //   this.ingredients = ingredients;
    // });
  }

  onEditItem(index: number){
    // this.shoppingListService.startEditing(index);
    this.store.dispatch(new StartEdit(index));
  }
}
