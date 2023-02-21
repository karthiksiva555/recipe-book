import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start'
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start'; // Signup success and failure are same as login success and failure
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: { userName: string, password: string}) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    
    constructor(public payload: {email: string, id: string, token: string, expirationDate: Date}) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: { userName: string, password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;    
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = LoginStart | LoginSuccess | LoginFail | Logout | SignupStart | ClearError | AutoLogin;