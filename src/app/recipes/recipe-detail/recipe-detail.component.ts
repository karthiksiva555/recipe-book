import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;
  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.loadRecipe();
    });
    
    this.loadRecipe();
  }

  onAddToCart(){
    this.shoppingListService.addIngredients(this.recipe.ingredients.slice());
  }

  loadRecipe(){
    this.recipe = this.recipeService.getRecipe(this.recipeId);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeId);
    this.recipe = null; // this will set the ng-template to else; alternatively, we can navigate to /recipes using router
  }

}
