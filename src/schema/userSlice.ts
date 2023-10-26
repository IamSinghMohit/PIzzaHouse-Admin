import { User } from "../modules/auth/schema/user";

export interface UserSliceState {
    user:User | null;
    isTriedToAutoLogin:boolean
    isNavOpen:boolean
}