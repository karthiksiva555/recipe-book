import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  firebaseUrl = "https://recipe-book-b16e4-default-rtdb.firebaseio.com/recipes.json";

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.firebaseUrl, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes(){
    this.http.get<Recipe[]>(this.firebaseUrl)
    // if the ingredients are undefined, below block sets it to empty array
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []}
      })  
    }))
    .subscribe(response=>{
      this.recipeService.setRecipes(response);
    });
  }
}
