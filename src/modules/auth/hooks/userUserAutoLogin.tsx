import { useQuery } from "@tanstack/react-query";
import { TUserSchema, UserSchema } from "../schema";
import { TBackendErrorReponse } from "@/utils";
import api from "@/lib/axios";

export function useUserAutoLogin({ enabled }: { enabled: boolean }) {
    return useQuery<TUserSchema, TBackendErrorReponse>({
        queryKey: ["user", "me"],
        queryFn: async () => await api.get("/auth/me").then((res) => res.data),
        select(data) {
            return UserSchema.parse(data);
        },
        enabled: enabled,
    });
}
