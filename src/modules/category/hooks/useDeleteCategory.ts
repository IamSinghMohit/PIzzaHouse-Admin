import axios from "@/lib/axios";
import { BackendError } from "@/schema/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

async function deleteCategory(args:{id:string,image:string}): Promise<{message:string}> {
    return await axios.delete(`/category/delete/${args.id}/${args.image}`).then((res) => res.data);
}

export function useDeleteCategory() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "delete"],
        mutationFn: deleteCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["category"],
                exact: true,
            });
        },
        onError: (err: AxiosError<BackendError>) => {
            toast.error(err.response?.data.error);
        },
    });
}
