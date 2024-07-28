import { Action, Selector, State, StateContext, createSelector } from "@ngxs/store";
import { UserProfileModel } from "./user-profile.model";
import { Injectable } from "@angular/core";
import { UserProfileAction } from "./user-profile.actions";
import { UserProfileService } from "./user-profile.service";
// import { ToastrService } from "ngx-toastr";
import { of,  throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { tap,catchError } from "rxjs/operators";

export class UserProfileStateModel {
    userProfile:UserProfileModel
    loadingUserProfile:boolean
}


@State<UserProfileStateModel>({
    name: "userprofile",
    defaults:{
        loadingUserProfile:false,
        userProfile:null
    }
})
@Injectable()
export class UserProfileState{
    constructor(
        private _userProfilesService:UserProfileService,
        // private _toastrService:ToastrService,
        private _authService:AuthService
    ){}

    @Selector()
    static selectStateLoading(state:UserProfileStateModel)
    {
        return state.loadingUserProfile
    }

    @Selector()
    static selectStateUserProfile(state:UserProfileStateModel)
    {
        return state.userProfile
    }

    @Action(UserProfileAction.SetUserProfile)
    setUserProfileState(ctx:StateContext<UserProfileStateModel>,{user}:UserProfileAction.SetUserProfile)
    {
        ctx.patchState({loadingUserProfile:false,userProfile:user.toJSON()})
    }

    @Action(UserProfileAction.LoginUserProfile)
    loginUserProfileState(ctx:StateContext<UserProfileStateModel>,{email,password}:UserProfileAction.LoginUserProfile)
    {
        const state = ctx.getState();
        ctx.patchState({
            loadingUserProfile: true
        })

        return this._authService.login(email,password).pipe(
            tap(
                (result)=>{
                    ctx.patchState({
                        loadingUserProfile:false,
                        userProfile:result.data
                    })
                    // this._toastrService.success(`Profil utilisateur modifié avec success`, 'UserProfile');
                }
            ),
            catchError((error) => {
                // this._toastrService.error(error?.error?.message, 'Erreur');
                ctx.patchState({
                    loadingUserProfile: false
                })
                return throwError(error);
                
            })
        )
    }

    @Action(UserProfileAction.SignupSimpleUserProfile)
    signupSimpleUserProfileState(ctx:StateContext<UserProfileStateModel>,{email,password,username}:UserProfileAction.SignupSimpleUserProfile)
    {
        const state = ctx.getState();
        ctx.patchState({
            loadingUserProfile: true
        })

        return this._authService.register(email,password,username).pipe(
            tap(
                (result)=>{
                    ctx.patchState({
                        loadingUserProfile:false,
                        userProfile:result.data
                    })
                    // this._toastrService.success(`Profil utilisateur modifié avec success`, 'UserProfile');
                }
            ),
            catchError((error) => {
                // this._toastrService.error(error?.error?.message, 'Erreur');
                ctx.patchState({
                    loadingUserProfile: false
                })
                return throwError(error);
                
            })
        )
    }

    

    @Action(UserProfileAction.UpdateUserProfile)
    updateUserProfile(ctx:StateContext<UserProfileStateModel>, {userProfile,id}:UserProfileAction.UpdateUserProfile)
    {
        const state = ctx.getState();
        ctx.patchState({
            loadingUserProfile: true
        })

        return this._userProfilesService.updateUserProfile(userProfile,id).pipe(
            tap(
                (result)=>{
                    ctx.patchState({
                        loadingUserProfile:false,
                        userProfile
                    })
                    // this._toastrService.success(`Profil utilisateur modifié avec success`, 'UserProfile');
                }
            ),
            catchError((error) => {
                // this._toastrService.error(error?.error?.message, 'Erreur');
                ctx.patchState({
                    loadingUserProfile: false
                })
                return throwError(error);
                
            })
        )
    }

    
    @Action(UserProfileAction.updateLoadingUserProfileState)
    updateLoadingUserProfileState(ctx:StateContext<UserProfileStateModel>,{status}:UserProfileAction.updateLoadingUserProfileState)
    {
        const state = ctx.getState();
        ctx.patchState(
            {
                loadingUserProfile:status
            }
        )
        return of(true)
    }

   

    @Action(UserProfileAction.FetchUserProfile)
    fetchUserProfile(ctx:StateContext<UserProfileStateModel>,{email}:UserProfileAction.FetchUserProfile)
    {
        const state = ctx.getState();
        if(state.userProfile) return of(true);

        ctx.patchState({
            loadingUserProfile:true
        })
        return this._userProfilesService.getUserProfile(email).pipe(
            tap(
                result => {
                    ctx.setState({
                        loadingUserProfile:false,
                        userProfile:result.data
                    })
                }
            )
        )
    }
}