import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // Alternatively, we can create ingredientsChanged = new EventEmitter<Ingredient[]>()
  // with ingredientsChanged, we can emit it for Delete(), Update() as well (if introduced in future)
  ingredientAdded = new Subject<Ingredient>();
  
  constructor() { }

  private ingredients: Ingredient[] = [
    new Ingredient('Chicken', 1),
    new Ingredient('Carror', 5)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientAdded.next(newIngredient);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
  }

}
