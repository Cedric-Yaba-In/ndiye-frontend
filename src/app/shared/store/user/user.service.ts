import { Injectable } from "@angular/core";
// import { environment } from "environments/environment";
import { UserModel } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { Observable, combineLatest, concatAll, of, switchMap } from "rxjs";
import { ApiResultFormat } from "../global";
import { ApiService } from "src/app/services/api/api.service";

@Injectable({
    providedIn:'root'
})
export class UserService
{
    /**
     * Constructor
     */
    constructor(private api: ApiService )
    {}


    /**
     * Update contact
     */
    updateUser(contact:UserModel,id:string): Observable<ApiResultFormat<UserModel>>
    {
        return null;

        // return this._httpClient.put<ApiResultFormat<UserModel>>(`${environment.apiUrl}/user/profile/${id}`, contact)
    }

    getAllUSer(): Observable<any[]> {
        return null;
        // this.api.collectionDataQuery(
        //   'user', this.api.whereQuery('uid', '!=', this.currentUserId)
        // );
    }

    getUser(userId):Observable<ApiResultFormat<UserModel[]>>
    {
        return this.api.collectionDataQuery( 'user', this.api.whereQuery('uid', '==', userId))
        .pipe( switchMap(data => of({statusCode:200,data})));
    }

    getUsers(userId:string[]):Observable<ApiResultFormat<UserModel[]>>
    {
        console.log("User ID ", userId)
        if(userId.length===0)
        {
            return this.api.collectionDataQuery( 'user', )
            .pipe( switchMap(data => {
                console.log("Data ",data)
                return of({statusCode:200,data})
            }));
        }
        else 
        {
            return combineLatest( userId.map(id => this.getUser(id)) )
            .pipe(
                switchMap((result)=>{
                return of({
                    statusCode:200,
                    data: result.map(r=>r.data).reduce((acc, val)=> ([...acc,...val]), [])
                })
            }))
        }
        
        
    }
}