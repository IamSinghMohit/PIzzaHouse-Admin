import { useQuery } from "@tanstack/react-query";
import { TUserSchema, UserSchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

export function useUserAutoLogin({ enabled }: { enabled: boolean }) {
    return useQuery<TUserSchema, TBackendErrorReponse>({
        queryKey: ["user", "me"],
        queryFn: async () =>
            await makeRequest(
                {
                    url: "/auth/me",
                    method: "GET",
                },
                UserSchema
            ),
        enabled: enabled,
    });
}
