import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe';
import * as fromApp from 'src/app/store/app.reducer';
import { RecipeService } from '../../recipe.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  recipe: Recipe;
  @Input() recipeId: number;
  
  constructor(private recipeService: RecipeService, 
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    //this.recipe = this.recipeService.getRecipe(this.recipeId);
    this.store.select('recipes').pipe(
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.recipeId;
        })
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
}
