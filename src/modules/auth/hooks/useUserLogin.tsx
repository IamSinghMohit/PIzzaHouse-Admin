import { useMutation } from "@tanstack/react-query";
import {
    TLoginFormSchema,
    TUserSchema,
    UserSchema,
} from "@/modules/auth/schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function login(data: TLoginFormSchema): Promise<TUserSchema> {
    return await makeRequest(
        {
            url: "auth/login",
            method: "POST",
            data: data,
        },
        UserSchema
    );
}

export const useUserLogin = () => {
    return useMutation<TUserSchema, TBackendErrorReponse, TLoginFormSchema>({
        mutationKey: ["user", "login"],
        mutationFn: login,
    });
};
