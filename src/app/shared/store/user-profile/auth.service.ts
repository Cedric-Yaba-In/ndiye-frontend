import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { ApiService } from "./../../services/api/api.service";
import { BehaviorSubject, Observable, from } from 'rxjs';
import { UserProfileModel } from './user-profile.model';
import { ApiResultFormat } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;
  currentUserSubject:BehaviorSubject<any>=new BehaviorSubject(null)

  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ) { }

  login(email: string, password: string): Observable<ApiResultFormat<User>> 
  {

    return from(
      new Promise<ApiResultFormat<User>>((resolve,reject)=>{
        signInWithEmailAndPassword(this.fireAuth, email, password)
        .then((result)=> resolve({ statusCode:200,data: result.user}) )
        .catch((error)=>reject({statusCode:400,message:error}))
      })
    )
  }

  getId() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    return this.currentUser?.uid;
  }

  setUserData(uid) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  register(email: string, password: string,username:string):Observable<ApiResultFormat<User>> {
    let registredUser:any=null;
    return from(
      new Promise<ApiResultFormat<User>>((resolve,reject)=>{
        createUserWithEmailAndPassword(this.fireAuth, email, password)
        .then((result)=>{
          registredUser = result.user;
           return updateProfile(result.user,{displayName:username});
          } )
        .then((result)=> resolve({ statusCode:200,data: registredUser}) )
        .catch((error)=>reject({statusCode:400,message:error}))
      })
    )
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.fireAuth, email);
    } catch(e) {
      throw(e);
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      this._uid.next(null);
      this.currentUser = null;
      return true;
    } catch(e) {
      throw(e);
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, user => {
        console.log('auth user: ', user);
        resolve(user)
      });
    });
  }

  async getUserData(id) {
    const docSnap: any = await this.apiService.getDocById(`user/${id}`);
      if(docSnap?.exists()) {
        return docSnap.data();
      } else {
        throw('No such document exists');
      }
  }
}