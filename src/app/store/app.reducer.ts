import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}

// this is a constant that defines all reducers and their keys
// with this, we don't need to put the list in app.module anymore
export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};