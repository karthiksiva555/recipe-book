import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelectedEvent.subscribe(result => {
      this.recipe = result;
    });
  }

  onAddToCart(){
    this.shoppingListService.addIngredients(this.recipe.ingredients.slice());
  }

}
