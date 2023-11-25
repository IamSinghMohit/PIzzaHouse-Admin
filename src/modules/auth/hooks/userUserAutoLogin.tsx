import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { User } from "@/modules/auth/schema";


export function useUserAutoLogin(opts?:{}){
    return useQuery({
        queryKey: ["user", "me"],
        queryFn: () => axios.get<User>("/auth/me").then((res) => res.data),
        retry:1,
        ...opts,
    });
}
