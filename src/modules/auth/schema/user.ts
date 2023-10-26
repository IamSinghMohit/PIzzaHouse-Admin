import {z,TypeOf} from "zod"

export const UserSchema = z.object({
    id:z.string(),
    name:z.string(),
    avatar:z.string().optional(),
    createdAt:z.string(),
    updatedAt:z.string()
})

export type LoginFormInput = {
    email?: string;
    password?: string;
};

export type User = TypeOf<typeof UserSchema>