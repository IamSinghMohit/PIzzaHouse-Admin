import { makeRequest } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export function useUserLogout(enabled:boolean) {
    return useQuery({
        queryKey: ["user", "logout"],
        queryFn: async () => {
            return makeRequest(
                {
                    url: "auth/logout",
                    method: "GET",
                },
                z.string(),
            );
        },
        enabled:enabled
    });
}
