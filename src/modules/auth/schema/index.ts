import { z, TypeOf } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    avatar: z.string().optional(),
    first_name: z.string(),
    last_name: z.string().optional(),
});

export const LoginFormSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});

export type TUserSchema = TypeOf<typeof UserSchema>;
export type TLoginFormSchema = TypeOf<typeof LoginFormSchema>;
