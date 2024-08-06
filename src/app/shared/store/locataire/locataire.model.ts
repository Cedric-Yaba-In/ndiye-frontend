import { UserModel } from "../user/user.model";

export interface LocataireModel extends UserModel {
    roomId: string;
    propertyId:string;
    description?:string;
}