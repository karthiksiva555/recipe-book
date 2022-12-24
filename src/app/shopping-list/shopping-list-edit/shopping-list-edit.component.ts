import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('shopForm') shoppingForm: NgForm;
  ilSubscription: Subscription;
  editItem: Ingredient;
  editMode: boolean = false;
  editIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ilSubscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editIndex = index;
      this.editItem = this.shoppingListService.getIngredient(index);
      this.editMode = true;
      this.shoppingForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      });
    })
  }

  ngOnDestroy(): void {
    this.ilSubscription.unsubscribe();
  }

  onAdded(){
    const ingredient = new Ingredient(this.shoppingForm.form.value.name, this.shoppingForm.form.value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editIndex, ingredient);
    } else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.onClear();
  }
}
