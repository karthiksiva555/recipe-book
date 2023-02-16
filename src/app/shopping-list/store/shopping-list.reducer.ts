import { Ingredient } from "src/app/models/ingredient";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Chicken', 1),
        new Ingredient('Carrot', 5)
    ]
};

// state = initialState => setting the default value for state
// action can be typed Action to keep it generic, but we will lose the intellisense on payload
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {...state, 
                ingredients: [...state.ingredients, action.payload]
            }; // copy all properties from state and override ingredients
        case ShoppingListActions.ADD_INGREDIENTS:
            return { ...state, 
                ingredients: [...state.ingredients, ...(action.payload as Ingredient[])]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            // Get the current ingredient from state
            const payload = action.payload as unknown as {index: number, list: Ingredient[]};
            const ingredient = state.ingredients[payload.index];
            const updatedIngredient = { ...ingredient, ...payload.list };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[payload.index] = updatedIngredient;
            return { ...state, ingredients: updatedIngredients};
        case ShoppingListActions.DELETE_INGREDIENT:
            return { ...state, 
                ingredients: state.ingredients.filter((ig, index) => {return index!== payload.index})
            };
        default:
            return state;
    }
}