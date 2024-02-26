import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  successToast } from "@/lib/toast";
import { ProductSchema, TProductSchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function createProduct(data: any): Promise<TProductSchema> {
    return await makeRequest(
        {
            url: "/product/admin/create",
            method:'POST',
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        ProductSchema
    );
}

export function useCreateProduct() {
    const qeryClient = useQueryClient();
    return useMutation<TProductSchema,TBackendErrorReponse,any>({
        mutationKey: ["product", "create"],
        mutationFn: createProduct,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["product"],
            });
            successToast("product created");
        },
    });
}
