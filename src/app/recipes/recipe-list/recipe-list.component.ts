import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipesChangedSubscription: Subscription;
  recipes: Recipe[];  
  
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesChangedSubscription =this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  // Instead of adding click listener for button, we can also add routerLink="./new" on it.
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }
}
