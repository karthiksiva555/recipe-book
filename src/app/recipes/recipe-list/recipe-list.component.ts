import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  recipes: Recipe[];  
  
  constructor(private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.recipes = this.recipeService.getRecipes();
    // this.recipesChangedSubscription =this.recipeService.recipesChanged.subscribe(recipes => {
    //   this.recipes = recipes;
    // });
    this.subscription = this.store.select('recipes')
      .pipe(map(recipeState => {
        return recipeState.recipes;
      }))
      .subscribe((recipeList: Recipe[]) => {
        this.recipes = recipeList;
      });
  }

  // Instead of adding click listener for button, we can also add routerLink="./new" on it.
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
