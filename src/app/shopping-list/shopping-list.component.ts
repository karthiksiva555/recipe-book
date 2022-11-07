import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Chicken', 1),
    new Ingredient('Carror', 5)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(newIngredient: Ingredient){
    console.log(newIngredient);
    this.ingredients.push(newIngredient);
  }

}
