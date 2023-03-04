import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from 'rxjs/operators';
import { Recipe } from "../models/recipe";
//import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    
    // constructor(private dataStorageService: DataStorageService){}
    constructor(private store: Store<fromApp.AppState>, private actions$: Actions){ }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        //return this.dataStorageService.fetchRecipes();
        this.store.dispatch(new RecipesActions.FetchRecipes());
        
        // this is a workaround to make the control wait till fetchRecipes action is complete
        // by listening to the the SET_RECIPES action
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
    }
}