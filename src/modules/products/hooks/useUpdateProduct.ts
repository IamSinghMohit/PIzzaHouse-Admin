import { useMutation, useQueryClient } from "@tanstack/react-query";
import { successToast } from "@/lib/toast";
import { ProductSchema, TProductSchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function updateProduct(data: any): Promise<TProductSchema> {
    return await makeRequest(
        {
            url: `product/admin`,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        ProductSchema
    );
}

export function useUpdateProduct() {
    const qeryClient = useQueryClient();
    return useMutation<TProductSchema, TBackendErrorReponse, any>({
        mutationKey: ["product", "update"],
        mutationFn: updateProduct,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["product"],
            });
            successToast("product updated");
        },
    });
}
