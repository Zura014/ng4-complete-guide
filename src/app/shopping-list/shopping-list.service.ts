import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice(); 
    }

    addIngredient(ingredient: Ingredient): void {
        if(ingredient.amount === 0) return;
        for(let i = 0; i < this.ingredients.length; i++){
            if(this.ingredients[i].name === ingredient.name){
                this.ingredients[i].amount = Number(this.ingredients[i].amount) + Number(ingredient.amount);
                this.ingredientsChanged.emit(this.ingredients.slice());
                return;
            }
        }
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]): void{
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }        
        for(let i = 0; i < this.ingredients.length; i++){
            for(let j = i + 1; j < this.ingredients.length; j++){
                if(this.ingredients[i].name === this.ingredients[j].name){
                    this.ingredients[i].amount = Number(this.ingredients[i].amount) + Number(this.ingredients[j].amount);
                    this.ingredients.splice(j, 1);
                    j--;
                }
            }
        }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

}