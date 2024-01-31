import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { successToast } from "@/lib/toast";

export function useDeleteToping() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["toping", "delete"],
        mutationFn: (id: string) =>
            axios.delete(`/toping/admin/${id}`).then((res) => res.data),
        onSuccess: () => {
            successToast("toping deleted");

            queryClient.invalidateQueries({
                queryKey: ["toping"],
            });
        },
    });
}
