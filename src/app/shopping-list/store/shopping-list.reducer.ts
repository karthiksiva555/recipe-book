import { Ingredient } from "src/app/models/ingredient";
import * as ShoppingListActions from './shopping-list.actions';

// a custom type to represent the State for ShoppingList reducer
export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex : number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Chicken', 1),
        new Ingredient('Carrot', 5)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

// state = initialState => setting the default value for state
// action can be typed Action to keep it generic, but we will lose the intellisense on payload
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions){
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
            // const payload = action.payload as unknown as {index: number, list: Ingredient[]};
            //const ingredient = state.ingredients[payload.index];
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = { ...ingredient, ...action.payload };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return { ...state, ingredients: updatedIngredients};
        
        case ShoppingListActions.DELETE_INGREDIENT:
            return { ...state, 
                ingredients: state.ingredients.filter((ig, index) => {
                    return index!== state.editedIngredientIndex
                })
            };
        // with this, the edited item and its index are set in app state as soon as list item is selected by user
        // we can remove index param in payload for Delete, Update actions
        case ShoppingListActions.START_EDIT: 
            return { ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return { ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;
    }
}