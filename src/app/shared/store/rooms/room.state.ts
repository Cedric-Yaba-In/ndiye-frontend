import { Action, Selector, State, StateContext, createSelector } from "@ngxs/store";
import { RoomModel, RoomType } from "./room.model";
import { Injectable } from "@angular/core";
import { RoomAction } from "./room.actions";
import { RoomService } from "./room.service";
// import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export class RoomStateModel {
    rooms:RoomModel[]
    loadingRoom:boolean
    initLoadingState:'NO_LOADED'|'LOADING'|'LOADED';
}


@State<RoomStateModel>({
    name: "rooms",
    defaults:{
        loadingRoom:false,
        rooms:[
            {
                description: 'SmartCity',
                id: '1204',
                code: '1204',
                type:RoomType.SIMPLE_APARTMENT,
                price:2000,
                propertyId:"1204",
                locataireId:"1",
                isFree:false
              },
              {
                description: 'SmartCity',
                id: '1205',
                code: '1205',
                type:RoomType.ROOM,
                price:2000,
                propertyId:"1204",
                isFree:true
              },
        ],
        initLoadingState:'NO_LOADED',
    }
})
@Injectable()
export class RoomState{
    constructor(
        private _roomsService:RoomService,
    ){}

    @Selector()
    static selectStateLoading(state:RoomStateModel)
    {
        return state.loadingRoom
    }
    @Selector() 
    static setlectStateRooms(state:RoomStateModel)
    {
        return state.rooms
    }

    static selectStateRoom(roomId)
    {
        return createSelector([RoomState],(state)=>{
            let data=state.rooms.find((u)=>u.id==roomId)
            if(data) return data
            return null;
        })
    
    }

    static selectStateRoomByRoomName(name=null)
    {
        return createSelector([RoomState],(state)=> state.rooms.filter((room)=>{
                if(name==null) return room;
                if(room.name.indexOf(name)) return room;
            }))
    
    }

    static selectStateRoomByPropertyId(id)
    {
        return createSelector([RoomState],(state)=> state.rooms.filter((room)=>room.propertyId==id));    
    }

    @Action(RoomAction.UpdateRoom)
    updateRoom(ctx:StateContext<RoomStateModel>, {room,id}:RoomAction.UpdateRoom)
    {
        const state = ctx.getState();
        ctx.patchState({
            loadingRoom: true
        })

        return this._roomsService.updateRoom(room,id).pipe(
            tap(
                (result)=>{
                    const data = [...state.rooms]
                    let index = data.findIndex((u)=>u.id==id);
                    if(index>-1) data[index]=result.data;
                    ctx.patchState({
                        loadingRoom:false,
                        rooms:data
                    })
                    // this._toastrService.success(`Profil utilisateur modifié avec success`, 'Room');
                }
            ),
            catchError((error) => {
                // this._toastrService.error(error?.error?.message, 'Erreur');
                ctx.patchState({
                    loadingRoom: false
                })
                return throwError(error);
                
            })
        )
    }

    
    @Action(RoomAction.updateLoadingRoomState)
    updateLoadingRoomState(ctx:StateContext<RoomStateModel>,{status}:RoomAction.updateLoadingRoomState)
    {
        const state = ctx.getState();
        ctx.patchState(
            {
                loadingRoom:status
            }
        )
        return of(true)
    }

   

    @Action(RoomAction.FetchRoom)
    fetchRoom(ctx:StateContext<RoomStateModel>,{roomId}:RoomAction.FetchRoom)
    {
        const state = ctx.getState();
        let index = state.rooms.findIndex((u)=>u.id==roomId);

        if(index>-1) return of(true);

        ctx.patchState({
            loadingRoom:true
        })
        return this._roomsService.getRoom(roomId).pipe(
            tap(
                result => {
                    ctx.patchState({
                        loadingRoom:false,
                        rooms:[...state.rooms, result.data]
                    })
                }
            )
        )
    }

    @Action(RoomAction.CreateRoom)
    createRoom(ctx:StateContext<RoomStateModel>,{room}:RoomAction.CreateRoom)
    {
        const state = ctx.getState();

        ctx.patchState({
            loadingRoom:true
        })
        return this._roomsService.createRoom(room).pipe(
            tap(
                result => {
                    ctx.patchState({
                        loadingRoom:false,
                        rooms:[...state.rooms, result.data]
                    })
                }
            )
        )
    }

    @Action(RoomAction.FetchRooms)
    fetchRooms(ctx:StateContext<RoomStateModel>)
    {
        const state = ctx.getState();
        if(state.initLoadingState=="LOADED") return of(true);
        
        ctx.patchState({
            loadingRoom:true,
            initLoadingState:"LOADING"
        })
        return this._roomsService.getRooms().pipe(
            tap(
                result => {
                    if(state.initLoadingState!="LOADED") ctx.patchState({initLoadingState:'LOADING'})
                    ctx.patchState({
                        loadingRoom:false,
                        rooms:[...state.rooms,...result.data],
                    })
                }
            )
        )
    }
}