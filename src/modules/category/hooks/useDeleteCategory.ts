import { successToast } from "@/lib/toast";
import { BaseDeleteResponseSchema, TBaseDeleteReponseSchema } from "@/schema";
import { makeRequest } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteCategory(id: string): Promise<TBaseDeleteReponseSchema> {
    return await makeRequest(
        {
            url: `/category/admin/delete/${id}`,
            method: "DELETE",
        },
        BaseDeleteResponseSchema
    );
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation<
        TBaseDeleteReponseSchema,
        TBaseDeleteReponseSchema,
        string
    >({
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
