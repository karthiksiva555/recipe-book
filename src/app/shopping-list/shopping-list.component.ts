import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // private iaSubscription: Subscription;
  // ingredients: Ingredient[] = [];
  ingredients: Observable<{ ingredients: Ingredient[]}>;

  // {shoppingList: {ingredients: []}} => type {key : value} where value is list of ingredients
  constructor(private shoppingListService: ShoppingListService, public store: Store<{shoppingList: {ingredients: []}}>) { }
  
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
    this.shoppingListService.startEditing(index);
  }
}
