import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  recipeSelectedEvent = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tandoori Chicken', 'A healthy Indian chicken recipe', 'https://hips.hearstapps.com/hmg-prod/images/chicken-tandori-1526595014.jpg'),
    new Recipe('Carrot Salad', 'A healthy carrot salad with lime', 'https://www.eatwell101.com/wp-content/uploads/2020/11/Shredded-Carrot-Salad-recipe.jpg')
  ];
  
  getRecipes(){
    return this.recipes.slice(); // to get a copy of the array instead of reference
  }

  recipeSelected(recipe: Recipe){
    this.recipeSelectedEvent.emit(recipe);    
  }

}
