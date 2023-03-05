import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { AppState } from 'src/app/store/app.reducer';
import { RecipeService } from '../recipe.service';
import { DeleteRecipe } from '../store/recipe.actions';
import { map, switchMap } from 'rxjs/operators';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;
  constructor(private recipeService: RecipeService, 
    private shoppingListService: ShoppingListService, 
    private route: ActivatedRoute,
    private store:Store<AppState>) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.recipeId = +params['id'];
    //   // this is calling a subscribe inside another subscribe
    //   // nothing wrong with it, but to make one clean observable, this code is commented and used switchMap
    //   // this.loadRecipe(); 
    // });
    //this.loadRecipe();

    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.recipeId = id;
        return this.store.select('recipes');
      }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.recipeId;
        })
      })
    ).subscribe(recipe => this.recipe = recipe);
  }

  onAddToCart(){
    // this.shoppingListService.addIngredients(this.recipe.ingredients.slice());
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  // this is no more needed as recipe is now loaded in ngOnInit 
  // by combining two observables( params,store.select) using switchMap
  loadRecipe(){
    //this.recipe = this.recipeService.getRecipe(this.recipeId);
    this.store.select('recipes').pipe(
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.recipeId;
        });
      })
    ).subscribe(recipe => this.recipe = recipe);
  }

  onDeleteRecipe(){
    //this.recipeService.deleteRecipe(this.recipeId);
    this.store.dispatch(new DeleteRecipe(this.recipeId));
    this.recipe = null; // this will set the ng-template to else; alternatively, we can navigate to /recipes using router
  }

}
