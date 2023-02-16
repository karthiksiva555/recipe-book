import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscriber, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { AddIngredient, DeleteIngredient, UpdateIngredient } from '../store/shopping-list.actions';

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

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: { ingredients: Ingredient[]}}> // inject store to handle add and update via store
    ) { }

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
      //this.shoppingListService.updateIngredient(this.editIndex, ingredient);
      this.store.dispatch(new UpdateIngredient({index: this.editIndex, ingredient: ingredient}));
    } else{
      // Commenting RxJs way of adding ingredient
      // this.shoppingListService.addIngredient(ingredient);
      // call store's dispatch to add ingredient
      this.store.dispatch(new AddIngredient(ingredient));
    }
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editIndex);
    this.store.dispatch(new DeleteIngredient(this.editIndex));
    this.onClear();
  }
}
