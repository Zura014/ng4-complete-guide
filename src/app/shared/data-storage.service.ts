import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class DataStorageService {

    DB_URL = "https://ng-course-recipe-book-3955c-default-rtdb.firebaseio.com";

    constructor(private http: HttpClient, private recipeService: RecipeService) { }


    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.DB_URL + '/recipes.json', recipes)
            .subscribe(res => {
                console.log(res);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.DB_URL + '/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }

}