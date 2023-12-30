import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

export function useDeleteToping() {
    return useMutation({
        queryKey: ["toping", "delete"],
        queryFn: (id: string) =>
            axios.delete(`/toping/admin/${id}`).then((res) => res.data),
    });
}
