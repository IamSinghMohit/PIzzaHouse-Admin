import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { BaseDeleteResponseSchema } from "@/schema";

const deleteProduct = async (id: string) => {
    return await makeRequest(
        {
            url: `/product/admin/${id}`,
            method: "DELETE",
        },
        BaseDeleteResponseSchema,
    );
};
export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["product", "delete"],
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product"],
            });
        },
    });
}
