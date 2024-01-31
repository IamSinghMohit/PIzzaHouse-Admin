import axios from "@/lib/axios";
import { successToast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteCategory(id: string): Promise<{ message: string }> {
    return await axios
        .delete(`/category/admin/delete/${id}`)
        .then((res) => res.data);
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "delete"],
        mutationFn: deleteCategory,
        onSuccess: () => {
            successToast("category deleted");
            queryClient.invalidateQueries({
                queryKey: ["category"],
            });
        },
    });
}
