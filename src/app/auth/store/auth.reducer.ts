import { User } from "src/app/models/user";
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    loading: boolean;
    authError: string;
}

const initialState: State = {
    user: null,
    loading: false,
    authError: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    
    switch(action.type){
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return { ...state,
                loading: true,
                authError: null
            };
        case AuthActions.LOGIN_SUCCESS:
            const {email, id, token, expirationDate} = action.payload;
            const user = new User(email, id, token, expirationDate); 
            return { ...state,
                user: user,
                loading: false,
                authError: null
            };
        case AuthActions.LOGIN_FAIL:
            return {...state,
                authError: action.payload,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {...state,
                user: null,
                loading: false,
                authError: null
            };
        case AuthActions.CLEAR_ERROR:
            return { ...state,
                authError: null
            }
        default:
            return state;
    }
}