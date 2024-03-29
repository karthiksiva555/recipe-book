import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipes/recipe.service';
import { SetRecipes } from '../recipes/store/recipe.actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  firebaseUrl = "https://recipe-book-b16e4-default-rtdb.firebaseio.com/recipes.json";

  constructor(private http: HttpClient, 
    private recipeService: RecipeService, 
    private authService: AuthService, 
    private store: Store<AppState>) { }

  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.firebaseUrl, recipes).subscribe(response => {
      console.log(response);
    });
  }

  // fetchRecipes() {
  //   // two subscriptions are combined using exhaustMap
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => { // waits till previous observable completes (user.take(1) in this case and joins below observable)
  //       console.log(user.token);
  //       return this.http.get<Recipe[]>(this.firebaseUrl,
  //         {
  //           params: new HttpParams().set('auth', user.token)
  //         });
  //     }),
  //     map(recipes => {
  //       return recipes.map(recipe => { // if the ingredients are undefined, below block sets it to empty array
  //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
  //       })
  //     }),
  //     tap(recipes => {
  //       this.recipeService.setRecipes(recipes);
  //     }));
  // }

  // Above method adds token in this request itself. Below method doesn't add token as it is added in interceptor
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.firebaseUrl).pipe(
      map(recipes => {
        return recipes.map(recipe => { // if the ingredients are undefined, below block sets it to empty array
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
      tap(recipes => {
        // this.recipeService.setRecipes(recipes);
        this.store.dispatch(new SetRecipes(recipes));
      })
    );
  }
}
