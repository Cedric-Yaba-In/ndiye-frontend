import { User, UserCredential } from "@angular/fire/auth";

export interface UserModel {

    name?:string;

    email?:string;

    phoneNumber?:string;
    
    photo?:string;

    country?:string;

    location?:string;

    uid?:string;
}