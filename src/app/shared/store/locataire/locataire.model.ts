import { UserModel } from "../user/user.model";

export interface LocataireModel extends UserModel {
    propertyId: string;
}