import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // Alternatively, we can create ingredientsChanged = new EventEmitter<Ingredient[]>()
  // with ingredientsChanged, we can emit it for Delete(), Update() as well (if introduced in future)
  ingredientAdded = new EventEmitter<Ingredient>();
  
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
    this.ingredientAdded.emit(newIngredient);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
  }

}
