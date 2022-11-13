import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  recipe: Recipe;
  @Input() recipeId: number;
  
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipeById(this.recipeId);
  }
}
