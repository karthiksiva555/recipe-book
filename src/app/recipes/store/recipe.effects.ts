import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "src/app/models/recipe";
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
    
    firebaseUrl = "https://recipe-book-b16e4-default-rtdb.firebaseio.com/recipes.json";

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}

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

    // This effect saves current recipes from state to firebase
    // we are not dispatching any actions after save is done ( may be we should listen to catchError)
    // withLatestFrom helps us get data from another observable and send it as input to next
    storeRecipes$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES), // observable 1
            withLatestFrom(this.store.select('recipes')), // observable 2
            switchMap(([actionData, recipesState]) => { // [obResult1, obResult2]
                return this.http.put(this.firebaseUrl, recipesState.recipes)
            })
        )
    }, {dispatch: false});
}