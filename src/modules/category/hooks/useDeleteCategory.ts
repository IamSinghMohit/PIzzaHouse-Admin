import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promiseToast } from "@/lib/toast";

async function deleteCategory(id: string): Promise<{ message: string }> {
    const promise = axios
        .delete(`/category/admin/delete/${id}`)
        .then((res) => res.data)
    promiseToast(
        promise,
        "deleting category",
        "Category deleted successfully",
        (err) =>  `${err}`
    );
    return await promise;
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "delete"],
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["category"],
            });
        },
    });
}
