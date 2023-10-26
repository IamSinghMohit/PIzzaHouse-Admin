import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginFormInput } from "@/modules/auth/schema/user";
import { User,UserSchema } from "@/modules/auth/schema/user";
import { BackendError } from "@/schema/Error";

interface QueryCallback {
    errCb: (err: string) => void;
}
const postUserData = async function (data: LoginFormInput): Promise<User> {
    const { data: res } = await axios.post("auth/login", data);
    const result = UserSchema.parse(res);
    return result;
};

export const useUserLogin = ({ errCb }: QueryCallback) => {
    return useMutation(["user"], postUserData, {
        onError: (error: AxiosError<BackendError>) =>
            errCb(error.response?.data.error || error.message),
    });
};
