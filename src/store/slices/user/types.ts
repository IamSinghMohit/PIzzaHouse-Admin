import { TUserSchema } from "@/modules/auth/schema";

export interface UserSliceState {
    user:TUserSchema| null;
    isTriedToAutoLogin:boolean
}
