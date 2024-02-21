import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export function useUserAutoLogin({ enabled }: { enabled: boolean }) {
    return useQuery({
        queryKey: ["user", "me"],
        queryFn: () => axios.get("/auth/me").then((res) => res.data),
        enabled,
    });
}
