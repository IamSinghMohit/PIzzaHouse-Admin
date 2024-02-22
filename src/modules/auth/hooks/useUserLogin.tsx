import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import {
    TLoginFormSchema,
    TUserSchema,
    UserSchema,
} from "@/modules/auth/schema";
import { ValidateBackendResponse } from "@/utils";

async function login(data: TLoginFormSchema): Promise<TUserSchema | undefined> {
    return await axios
        .post("auth/login", data)
        .then((res) => ValidateBackendResponse(res.data, UserSchema));
}

export const useUserLogin = () => {
    return useMutation({
        mutationKey: ["user", "login"],
        mutationFn: login,
    });
};
