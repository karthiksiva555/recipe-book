import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  constructor() { }

  // private recipes: Recipe[] = [
  //   new Recipe('Tandoori Chicken',
  //     'A healthy Indian chicken recipe',
  //     'https://hips.hearstapps.com/hmg-prod/images/chicken-tandori-1526595014.jpg',
  //     [
  //       new Ingredient('Chicken Leg', 4),
  //       new Ingredient('Tandoori Masala', 2)
  //     ]),
  //   new Recipe('Carrot Salad',
  //     'A healthy carrot salad with lime',
  //     'https://www.eatwell101.com/wp-content/uploads/2020/11/Shredded-Carrot-Salad-recipe.jpg',
  //     [
  //       new Ingredient('Carrot', 10),
  //       new Ingredient('Raw Mango', 1)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  getRecipes(){
    return this.recipes.slice(); // to get a copy of the array instead of reference
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(recipes);
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

}
