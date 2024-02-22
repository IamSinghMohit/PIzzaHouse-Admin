import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { ValidateBackendResponse } from "@/utils";
import { UserSchema } from "../schema";

export function useUserAutoLogin({ enabled }: { enabled: boolean }) {
    return useQuery({
        queryKey: ["user", "me"],
        queryFn: () =>
            axios
                .get("/auth/me")
                .then((res) => ValidateBackendResponse(res.data, UserSchema)),
        enabled,
    });
}
