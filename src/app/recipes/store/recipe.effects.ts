import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "src/app/models/recipe";
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
    
    firebaseUrl = "https://recipe-book-b16e4-default-rtdb.firebaseio.com/recipes.json";

    constructor(private actions$: Actions, private http: HttpClient){}

    // This effect fetches data from firebase and dispatches SetRecipes action to set local recipes state
    fetchRecipes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap(() => {
                return this.http.get<Recipe[]>(this.firebaseUrl);
            }),
            map(recipes => {
                return recipes.map(recipe => { // if the ingredients are undefined, below block sets it to empty array
                  return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            map(recipes => {
                return new RecipesActions.SetRecipes(recipes);
            })
        );
    });
}