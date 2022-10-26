import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Tandoori Chicken', 'A healthy Indian chicken recipe', 'https://hips.hearstapps.com/hmg-prod/images/chicken-tandori-1526595014.jpg'),
    new Recipe('Carror Salad', 'A healthy carrot salad with lime', 'https://www.eatwell101.com/wp-content/uploads/2020/11/Shredded-Carrot-Salad-recipe.jpg')
  ];
    
  constructor() { }

  ngOnInit(): void {
  }

}
