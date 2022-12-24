import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  isEdit: boolean;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        this.isEdit = this.recipeId > -1;
        this.initForm();
      }
    );
  }

  initForm(){
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);
    
    if(this.isEdit){
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingredients']){
        recipe['ingredients'].forEach(ingredient=>{
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        })
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    // ideally, recipeForm.value should also give recipe object
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    console.log(this.recipeForm.value['ingredients']);
    if(this.isEdit){
      this.recipeService.updateRecipe(this.recipeId, recipe);
    }
    else{
      this.recipeService.addRecipe(recipe);
    }
    this.clearForm();
  }

  get ingredientControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  clearForm(){
    this.recipeForm.reset();
    this.isEdit = false;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
