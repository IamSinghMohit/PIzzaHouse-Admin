import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginFormInput } from "@/modules/auth/schema";
import { User,UserSchema } from "@/modules/auth/schema";
import { BackendError } from "@/schema/Error";

interface QueryCallback {
    errCb: (err: string) => void;
}
async function login(data: LoginFormInput): Promise<User> {
    const { data: res } = await axios.post("auth/login", data);
    const result = UserSchema.parse(res);
    return result;
};

export const useUserLogin = ({ errCb }: QueryCallback) => {
    return useMutation({
        mutationKey:['user','login'],
        mutationFn:login
    });
};
