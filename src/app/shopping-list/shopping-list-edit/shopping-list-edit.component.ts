import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('name', {static: true}) name: ElementRef;
  @ViewChild('amount', {static: true}) amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdded(){
    const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value)
    this.shoppingListService.addIngredient(newIngredient);
  }

}
