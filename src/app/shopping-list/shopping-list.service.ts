import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { AddIngredients } from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // Alternatively, we can create ingredientsChanged = new EventEmitter<Ingredient[]>()
  // with ingredientsChanged, we can emit it for Delete(), Update() as well (if introduced in future)
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  
  constructor(private store: Store<fromShoppingList.AppState>) { }

  private ingredients: Ingredient[] = [
    new Ingredient('Chicken', 1),
    new Ingredient('Carrot', 5)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    // this.ingredients.push(...ingredients); 
    this.store.dispatch(new AddIngredients(ingredients));
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  startEditing(index: number){
    this.startedEditing.next(index);
  }

}
