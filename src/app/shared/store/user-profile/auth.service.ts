import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { UserProfileModel } from './user-profile.model';
import { ApiResultFormat } from '../global';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;
  currentUserSubject:BehaviorSubject<any>=new BehaviorSubject(null)

  constructor(
    private _httpClient: HttpClient
  ) { }

  login(email: string, password: string): Observable<ApiResultFormat<UserProfileModel>> 
  {
    return this._httpClient.get<ApiResultFormat<UserProfileModel>>(`${environment.apiUrl}/user/profil/${email}`);
  }


  register(email: string, password: string,username:string):Observable<ApiResultFormat<UserProfileModel>> {
    return this._httpClient.get<ApiResultFormat<UserProfileModel>>(`${environment.apiUrl}/user/profil/${email}`);

  }

  async resetPassword(email: string) {
 
  }

  async logout() {
    return null;
  }

}