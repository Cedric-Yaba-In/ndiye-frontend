import { Action, Selector, State, StateContext, createSelector } from "@ngxs/store";
import { PropertyModel } from "./property.model";
import { Injectable } from "@angular/core";
import { PropertyAction } from "./property.actions";
import { PropertyService } from "./property.service";
// import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export class PropertyStateModel {
    properties:PropertyModel[]
    loadingProperty:boolean
    initLoadingState:'NO_LOADED'|'LOADING'|'LOADED';
}


@State<PropertyStateModel>({
    name: "propertylist",
    defaults:{
        loadingProperty:false,
        properties:[],
        initLoadingState:'NO_LOADED',
    }
})
@Injectable()
export class PropertyState{
    constructor(
        private _propertysService:PropertyService,
    ){}

    @Selector()
    static selectStateLoading(state:PropertyStateModel)
    {
        return state.loadingProperty
    }
    @Selector() 
    static setlectStatePropertys(state:PropertyStateModel)
    {
        return state.properties
    }

    static selectStateProperty(propertyId)
    {
        return createSelector([PropertyState],(state)=>{
            let data=state.properties.find((u)=>u.uid==propertyId)
            if(data) return data
            return null;
        })
    
    }

    static selectStatePropertyByPropertyName(name=null)
    {
        return createSelector([PropertyState],(state)=> state.propertys.filter((property)=>{
                if(name==null) return property;
                if(property.name.indexOf(name)) return property;
            }))
    
    }

    @Action(PropertyAction.UpdateProperty)
    updateProperty(ctx:StateContext<PropertyStateModel>, {property,id}:PropertyAction.UpdateProperty)
    {
        const state = ctx.getState();
        ctx.patchState({
            loadingProperty: true
        })

        return this._propertysService.updateProperty(property,id).pipe(
            tap(
                (result)=>{
                    const data = [...state.properties]
                    let index = data.findIndex((u)=>u.id==id);
                    if(index>-1) data[index]=result.data;
                    ctx.patchState({
                        loadingProperty:false,
                        properties:data
                    })
                    // this._toastrService.success(`Profil utilisateur modifié avec success`, 'Property');
                }
            ),
            catchError((error) => {
                // this._toastrService.error(error?.error?.message, 'Erreur');
                ctx.patchState({
                    loadingProperty: false
                })
                return throwError(error);
                
            })
        )
    }

    
    @Action(PropertyAction.updateLoadingPropertyState)
    updateLoadingPropertyState(ctx:StateContext<PropertyStateModel>,{status}:PropertyAction.updateLoadingPropertyState)
    {
        const state = ctx.getState();
        ctx.patchState(
            {
                loadingProperty:status
            }
        )
        return of(true)
    }

   

    @Action(PropertyAction.FetchProperty)
    fetchProperty(ctx:StateContext<PropertyStateModel>,{propertyId}:PropertyAction.FetchProperty)
    {
        const state = ctx.getState();
        let index = state.properties.findIndex((u)=>u.id==propertyId);

        if(index>-1) return of(true);

        ctx.patchState({
            loadingProperty:true
        })
        return this._propertysService.getProperty(propertyId).pipe(
            tap(
                result => {
                    ctx.patchState({
                        loadingProperty:false,
                        properties:[...state.properties, result.data]
                    })
                }
            )
        )
    }

    @Action(PropertyAction.FetchProperties)
    fetchProperties(ctx:StateContext<PropertyStateModel>,{propertiesId}:PropertyAction.FetchProperties)
    {
        const state = ctx.getState();
        let notFounds:string[] = [];
        propertiesId.forEach((id)=>{
            let index = state.properties.findIndex((u)=>u.id==id);
            if(index==-1) notFounds.push(id);
        })
        if(notFounds.length==0 && state.initLoadingState=="LOADED") return of(true);
        
        ctx.patchState({
            loadingProperty:true,
            initLoadingState:"LOADING"
        })
        return this._propertysService.getProperties().pipe(
            tap(
                result => {
                    if(state.initLoadingState!="LOADED") ctx.patchState({initLoadingState:'LOADING'})
                    ctx.patchState({
                        loadingProperty:false,
                        properties:[...state.properties,...result.data],
                    })
                }
            )
        )
    }
}