import { Component, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', { static:false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static:false }) amountInputRef: ElementRef;
  @Output() IngredientAdded = new EventEmitter<Ingredient>();


  onAddItem(): void {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.IngredientAdded.emit(newIngredient);
  }
  

}
