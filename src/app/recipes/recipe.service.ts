import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  recipeSelectedEvent = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(1, 'Tandoori Chicken',
      'A healthy Indian chicken recipe',
      'https://hips.hearstapps.com/hmg-prod/images/chicken-tandori-1526595014.jpg',
      [
        new Ingredient('Chicken Leg', 4),
        new Ingredient('Tandoori Masala', 2)
      ]),
    new Recipe(2, 'Carrot Salad',
      'A healthy carrot salad with lime',
      'https://www.eatwell101.com/wp-content/uploads/2020/11/Shredded-Carrot-Salad-recipe.jpg',
      [
        new Ingredient('Carrot', 10),
        new Ingredient('Raw Mango', 1)
      ])
  ];
  
  getRecipes(){
    return this.recipes.slice(); // to get a copy of the array instead of reference
  }

  recipeSelected(recipe: Recipe){
    this.recipeSelectedEvent.emit(recipe);    
  }

  getRecipeById(recipeId: number){
    return this.recipes.slice().find(({id}) => recipeId === id);
  }

}
