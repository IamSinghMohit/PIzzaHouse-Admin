import axios from "@/lib/axios";
import { successToast } from "@/lib/toast";
import { BaseDeleteResponseSchema, TBaseDeleteReponseSchema } from "@/schema";
import { ValidateBackendResponse } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteCategory(id: string): Promise<TBaseDeleteReponseSchema | undefined> {
    return await axios
        .delete(`/category/admin/delete/${id}`)
        .then((res) => ValidateBackendResponse(res.data,BaseDeleteResponseSchema));
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
