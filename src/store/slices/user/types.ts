import { UserSchemaType } from "@/modules/auth/schema";
export interface UserSliceState {
    user:UserSchemaType  | null;
    isTriedToAutoLogin:boolean
}
