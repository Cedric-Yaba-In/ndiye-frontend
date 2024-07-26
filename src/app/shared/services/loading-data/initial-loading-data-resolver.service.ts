import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Actions, Store } from "@ngxs/store";
import { Observable, combineLatest, skipWhile, tap } from "rxjs";

import { ChatRoomAction,MessageAction,PostAction,UserAction,UserProfileService } from "../../store/";

@Injectable({
    providedIn:"root"
})
export class InitialLoadingDataResolver implements Resolve<any>
{
    
    /**
     * Constructor
     */
    constructor(private _store:Store){}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return combineLatest(
            this._store.select((state)=>state.userprofile.userProfile)
            .pipe(
                skipWhile((x)=>x==null),
                tap((value)=>this._store.dispatch([
                        new UserAction.FetchUsers(),
                        ])
                    ),
            ),
            this._store.select((state)=>state.chatroom.initLoadingState).pipe(skipWhile((initLoadingState)=>initLoadingState!="LOADED")),
        )
    }
}
