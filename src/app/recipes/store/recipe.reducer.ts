import { Recipe } from "src/app/models/recipe";
import * as RecipeActions from './recipe.actions';
export interface State {
    recipes: Recipe[],
    selectedRecipe: Recipe,
    selectedRecipeIndex: number
}

const initialState: State = {
    recipes: [],
    selectedRecipe: null,
    selectedRecipeIndex: -1
};

export function recipeReducer(state: State = initialState, action: RecipeActions.RecipeActions){

    switch(action.type){
        case RecipeActions.ADD_RECIPE:
            return {...state,
                recipes: [...state.recipes, action.payload] 
            };
        case RecipeActions.UPDATE_RECIPE:
            const currentRecipe = state.recipes[state.selectedRecipeIndex];
            const updatedRecipe = {...currentRecipe, ...action.payload};
            //const updatedRecipe = {...state.selectedRecipe, ...action.payload};
            const updatedRecipes = [...state.recipes];
            updatedRecipe[state.selectedRecipeIndex] = updatedRecipe;
            return {...state,
                recipes: updatedRecipes
            };
        case RecipeActions.SET_RECIPES:
            return {...state,
                recipes: [...action.payload]
            };
        case RecipeActions.DELETE_RECIPE:
            return {...state,
                recipes: [...state.recipes.splice(action.payload, 1)]
            };
        case RecipeActions.FETCH_RECIPES:
            return state;
        default:
            return state;
    }
}