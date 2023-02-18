import { Action } from "@ngrx/store";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;
    
    constructor(public payload: {email: string, id: string, token: string, expirationDate: Date}) {}
}

export class Logout implements Logout {
    readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;