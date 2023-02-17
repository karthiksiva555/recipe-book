import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient } from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer'; // this is a convention suggested by NgRx

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

  constructor(private store: Store<fromShoppingList.AppState> // inject store to handle add and update via store
    ) { }

  ngOnInit(): void {
    // this.ilSubscription = this.shoppingListService.startedEditing.subscribe(index => {
    //   this.editIndex = index;
    //   this.editItem = this.shoppingListService.getIngredient(index);
    //   this.editMode = true;
    //   this.shoppingForm.setValue({
    //     name: this.editItem.name,
    //     amount: this.editItem.amount
    //   });
    // })

    this.ilSubscription = this.store.select('shoppingList').subscribe(stateData => {
        if(stateData.editedIngredientIndex > -1){
          this.editMode = true;
          this.editItem = stateData.editedIngredient;
          this.shoppingForm.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount
          });
        }
        else{
          this.editMode = false;
        }
    });
  }

  ngOnDestroy(): void {
    this.ilSubscription.unsubscribe();
    this.store.dispatch(new StopEdit());
  }

  onAdded(){
    const ingredient = new Ingredient(this.shoppingForm.form.value.name, this.shoppingForm.form.value.amount)
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editIndex, ingredient);
      this.store.dispatch(new UpdateIngredient(ingredient));
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
    this.store.dispatch(new StopEdit());
  }

  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editIndex);
    // index is not needed in payload now as it is available in state's editedItemIndex
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }
}
