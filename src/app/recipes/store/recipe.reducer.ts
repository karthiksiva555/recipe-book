import { Recipe } from "src/app/models/recipe";
import * as RecipeActions from './recipe.actions';
export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []    
};

export function recipeReducer(state: State = initialState, action: RecipeActions.RecipeActions){

    switch(action.type){
        case RecipeActions.ADD_RECIPE:
            return {...state,
                recipes: [...state.recipes, action.payload] 
            };
        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipe = {...state.recipes[action.payload.index], ...action.payload.updatedRecipe};
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
            return {...state,
                recipes: updatedRecipes
            };
        case RecipeActions.DELETE_RECIPE:
            return {...state,
                    recipes: state.recipes.filter((recipe, index)=> {
                        return index !== action.payload
                    })
            };
        case RecipeActions.SET_RECIPES:
            return {...state,
                recipes: [...action.payload]
            };
        case RecipeActions.FETCH_RECIPES:
            return state;
        default:
            return state;
    }
}