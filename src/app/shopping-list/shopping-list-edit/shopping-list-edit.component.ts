import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('name', {static: true}) name: ElementRef;
  @ViewChild('amount', {static: true}) amount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdded(){
    const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value)
    this.ingredientAdded.emit(newIngredient);
  }

}
